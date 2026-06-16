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

## 🟢 Phase 1bis — Corrections & clarté (en cours, sans serveur)
- [ ] **Tirelire éditable** : historique des « j'ai résisté » / économies, cliquable, modifiable/supprimable
- [ ] **Cliquer sur un poste de dépense** (Analyse) → voir la liste des dépenses de ce poste (UX friendly)
- [x] **Micro « au lieu de »** : « pâtes à 2€ au lieu des raviolis à 4€ » → économie comptée, PAS la dépense (pas de doublon)
- [ ] Renommer onglet **Dettes → Silos** (projets où l'on déverse nos efforts)
- [ ] **Combats du JOUR → du MOIS** (les vrais combats sont long terme) + carte plus compacte
- [ ] **Roulette au « Marquer fait »** : choisir heures + satisfaction de soi → points variables
- [ ] **Streaks valorisés** dans les points
- [ ] **Page d'accueil moins fouillie** : hiérarchie plus claire, combats compactés

## 🟠 Phase 2 — Modes & jeu de points repensé (sans serveur)
- [ ] **Deux modes distincts** (code couleur du rose au jaune) :
  - **Mode Précarité** et **Mode Chaos** (déficit / survie)
  - Ambiance sous-marin / mission, alerte visuelle
- [ ] **Jeu de points repensé** :
  - En phase critique : les points servent à **racheter des dépenses inutiles**
  - Quand les finances le permettent : les points (streaks, bonnes pratiques) débloquent des **achats futiles récompenses**
  - Visuel d'une **dépense gelée** (plus comptée comme futile) — difficile à geler : régularité OU épargne dans les silos
  - **Dépenses futiles** (quand pauvre) : voyage loisir, verre, cigarettes, ciné, resto
- [ ] Dépense non essentielle (hors transport/loyer/santé) = **perte de points** en mode critique
- [ ] Suivi type Duolingo (streaks)

## 🟣 Phase 2bis — Fiabilité capture (sans serveur)
- [x] **File d'attente offline** pour la photo : ticket capté et mis en queue (protégé même sans réseau), réessai auto au retour réseau / pull-to-refresh (micro retiré)
- [x] L'IA bosse **en fond** → notification (toast + pastille sur l'appareil photo) quand le ticket est prêt à vérifier

## 🔴 Phase 3 — Cluster « backend » (serveur requis)
Ces fonctions vont ensemble car elles demandent la même brique (compte + serveur).
- [ ] **Compte utilisateur** + personnalisation + synchro multi-appareils (Supabase)
- [ ] **Connexion agenda par API** (Google Agenda…) → l'app sait ce qui arrive et estime les dépenses à venir
  - Prérequis : mieux libeller ses activités d'agenda
  - **L'agenda n'apparaît PAS** (pas de recréer Google Agenda)
  - À chaque actualisation de l'app : scan de l'agenda → **notification cloche** « veux-tu estimer le coût de tes engagements à venir ? »
  - Interface façon **Tinder** (swipe) + **roulette d'estimation de prix** (comme EasyPark)
  - Les événements estimés alimentent les **dépenses probables**
- [ ] **IA ange gardien** : planifie/prévoit les dépenses, te dit avec réalisme à quel point tu déranges tes finances, te rappelle les enjeux
- [ ] **Moteur audio cloud** (Whisper / Deepgram) : fiable sur les chiffres (Apple confond)
- [ ] **Recommandations de stratégies par IA** (version « règles » possible avant)

---

## Principe de priorisation
On valide l'usage réel avec les fonctions locales (Phases 1-2) avant d'investir dans le serveur (Phase 3). Le backend n'a de sens que si l'app devient un réflexe quotidien.
