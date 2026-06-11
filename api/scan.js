// Fonction serveur Vercel : reçoit une photo de ticket (base64) et la fait
// analyser par Claude (vision) pour en extraire les articles + le total.
// La clé API reste SECRÈTE côté serveur (process.env.ANTHROPIC_API_KEY).

const SCHEMA = {
  type: 'object',
  properties: {
    merchant: { type: 'string', description: "Nom du commerce si visible, sinon vide" },
    date: { type: 'string', description: "Date du ticket au format AAAA-MM-JJ si visible, sinon vide" },
    currency: { type: 'string', description: "Devise (ex: EUR), sinon vide" },
    items: {
      type: 'array',
      description: "Chaque ligne d'achat du ticket",
      items: {
        type: 'object',
        properties: {
          label: { type: 'string', description: "Libellé de l'article" },
          price: { type: 'number', description: "Prix de la ligne en nombre (ex: 4.5)" }
        },
        required: ['label', 'price'],
        additionalProperties: false
      }
    },
    total: { type: 'number', description: "Montant total payé" }
  },
  required: ['items', 'total'],
  additionalProperties: false
};

const SYSTEM = `Tu es un assistant qui lit des tickets de caisse français.
À partir de la photo, extrais chaque article avec son libellé et son prix, ainsi que le total payé.
Ignore les lignes qui ne sont pas des achats (TVA, sous-totaux, rendu monnaie, points de fidélité, numéro de carte).
Si un prix n'est pas lisible, n'invente pas : mets 0. Réponds uniquement avec les données structurées demandées.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(500).json({ error: "Clé API non configurée sur le serveur (ANTHROPIC_API_KEY)." });
    return;
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { image, mediaType } = body;
    if (!image) {
      res.status(400).json({ error: 'Aucune image reçue.' });
      return;
    }

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        system: SYSTEM,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: image } },
            { type: 'text', text: "Lis ce ticket de caisse et renvoie les articles (libellé + prix) et le total." }
          ]
        }],
        output_config: { format: { type: 'json_schema', schema: SCHEMA } }
      })
    });

    if (!apiRes.ok) {
      const detail = await apiRes.text();
      res.status(502).json({ error: "Erreur de l'analyse.", detail: detail.slice(0, 500) });
      return;
    }

    const data = await apiRes.json();
    const textBlock = (data.content || []).find(b => b.type === 'text');
    if (!textBlock) {
      res.status(502).json({ error: "Réponse vide de l'analyse." });
      return;
    }
    const parsed = JSON.parse(textBlock.text);
    res.status(200).json(parsed);
  } catch (e) {
    res.status(500).json({ error: e.message || 'Erreur inconnue.' });
  }
}
