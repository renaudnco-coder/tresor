// Lit un agenda via son lien iCal privé (Google Agenda → "Adresse secrète au format iCal").
// Renvoie les événements à venir (45 jours). Aucune clé secrète : le lien iCal EST l'accès,
// fourni par l'utilisateur et stocké en local sur son appareil.

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Méthode non autorisée' }); return; }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const ics = (body.ics || '').trim();
    if (!/^https:\/\//.test(ics)) { res.status(400).json({ error: 'Lien iCal invalide (doit commencer par https://).' }); return; }

    const r = await fetch(ics, { headers: { 'user-agent': 'tresor-app' } });
    if (!r.ok) { res.status(502).json({ error: "Impossible de lire l'agenda (lien incorrect ?)." }); return; }
    const text = await r.text();
    res.status(200).json({ events: parseICS(text) });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Erreur inconnue.' });
  }
}

function parseICS(text) {
  // déplie les lignes coupées (continuation = ligne qui commence par espace/tab)
  const raw = text.replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '');
  const lines = raw.split('\n');
  const events = [];
  let cur = null;
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') { cur = {}; continue; }
    if (line === 'END:VEVENT') { if (cur) events.push(cur); cur = null; continue; }
    if (!cur) continue;
    const ci = line.indexOf(':');
    if (ci < 0) continue;
    const key = line.slice(0, ci);
    const val = line.slice(ci + 1);
    const name = key.split(';')[0];
    if (name === 'SUMMARY') cur.summary = val.replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\n/gi, ' ');
    else if (name === 'UID') cur.uid = val;
    else if (name === 'DTSTART') { cur.start = parseDate(val); cur.time = parseTime(val); }
  }
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const max = new Date(today.getTime() + 45 * 864e5);
  return events
    .filter(e => e.start)
    .map(e => ({ key: (e.uid || (e.summary || '')) + '|' + e.start, summary: e.summary || 'Événement', start: e.start, time: e.time || '' }))
    .filter(e => { const d = new Date(e.start); return d >= today && d <= max; })
    .sort((a, b) => (a.start + (a.time || '')) < (b.start + (b.time || '')) ? -1 : 1)
    .slice(0, 40);
}

function parseDate(val) {
  const m = val.match(/(\d{4})(\d{2})(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}
function parseTime(val) {
  const m = val.match(/\d{8}T(\d{2})(\d{2})/);
  return m ? `${m[1]}:${m[2]}` : '';
}
