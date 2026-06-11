# Trésor — Feuille de route

L'esprit du projet : un **ange gardien financier** qui aide à prévoir, rester réaliste sur ses finances, et transformer la bonne gestion en jeu valorisant.

---

## ✅ Fait
- Dashboard (solde, budget du mois, mouvements)
- Silos de dépense (vue Analyse) + silos de dette (remplissage vers l'objectif)
- Tirelire + paliers + versement gamifié sur les dettes
- « J'ai résisté » + économies par comparaison (« X au lieu de Y »)
- Dictée vocale talkie (push-to-talk)
- Projection court/moyen/long terme + simulateur « Avant d'acheter »
- Export CSV (tableur comptable) + export JSON
- PWA installable, données locales privées

---

## 🟢 Phase 1 — Quick wins (sans serveur)
- [x] **Modifier / supprimer** une dépense, un revenu, une dette (corriger ses erreurs)
- [x] **Choix de paliers** : 20 / 40 / 60 / Autre (≥ 60)
- [x] **Actions de vie valorisées** : choisir 1-2 « combats » (musique, sport, lecture, étude, autre) → gagner des points de développement perso
- [x] **Système de récompense / « craquage mérité »** : bonne hygiène (finances + actions de vie) → débloque une dépense-plaisir légitime, dans un **projet choisi** (ex : déco de l'appart)
- [ ] **Onglet « Dépenses probables »** (saisie manuelle d'abord)
- [ ] Remplacer le message « tu tiens le cap » par quelque chose d'utile

## 🟠 Phase 2 — Mode & engagement (sans serveur)
- [ ] **Mode Chaos** (ambiance sous-marin / mission survie) : déclenché en déficit
  - Couleurs d'alerte sous-marin
  - Chaque dépense **non essentielle** (hors transport / loyer / santé) fait **perdre des points**
  - On s'en sort en travaillant ses actions de vie valorisées
  - Suivi type Duolingo (streaks)

## 🔴 Phase 3 — Cluster « backend » (serveur requis)
Ces fonctions vont ensemble car elles demandent la même brique (compte + serveur).
- [ ] **Compte utilisateur** + personnalisation + synchro multi-appareils (Supabase)
- [ ] **Connexion agenda par API** (Google Agenda…) → l'app sait ce qui arrive et estime les dépenses à venir
  - Prérequis : mieux libeller ses activités d'agenda
  - Alimente l'onglet « Dépenses probables » automatiquement
- [ ] **IA ange gardien** : planifie/prévoit les dépenses, te dit avec réalisme à quel point tu déranges tes finances, te rappelle les enjeux
- [ ] **Moteur audio cloud** (Whisper / Deepgram) : fiable sur les chiffres (Apple confond)
- [ ] **Recommandations de stratégies par IA** (version « règles » possible avant)

---

## Principe de priorisation
On valide l'usage réel avec les fonctions locales (Phases 1-2) avant d'investir dans le serveur (Phase 3). Le backend n'a de sens que si l'app devient un réflexe quotidien.
