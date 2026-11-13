# CinéTrack

## Présentation du projet

CinéTrack est une application web qui permet de consulter, rechercher, filtrer et gérer les films et les séries préférés.

L'application permet aux utilisateurs de découvrir des contenus cinématographiques et de gérer une liste de favoris de manière simple et intuitive.

## Fonctionnalités

- Affichage des films et des séries.
- Recherche par titre.
- Filtrage par type de contenu (Film / Série).
- Affichage des détails des films et des séries.
- Ajout et suppression des favoris.
- Gestion des favoris avec `localStorage`.
- Comptage des films et des séries dans la liste des favoris.
- Pagination des contenus.
- Affichage dynamique des cartes.

## Technologies utilisées

- HTML5
- JavaScript (ES6+)
- Tailwind CSS
- API REST
- Fetch API
- LocalStorage
- Git & GitHub
- Jira
- Vercel

## Structure du projet

```text
CinéTrack/
│
├── index.html
├── README.md
│
├── css/
│   └── output.css
│
├── js/
│   ├── main.js
│   ├── store.js
│   └── render.js
```

##  API utilisée

L'application utilise une API REST pour récupérer les données des films et des séries au format JSON.

### Exemple de données JSON

```json
{
  "id": "2",
  "title": "Breaking Bad",
  "type": "series",
  "releaseYear": 2008,
  "seasons": [1, 2, 3, 4, 5],
  "image": "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
  "description": "A chemistry teacher turns to manufacturing drugs.",
  "genres": ["Drama", "Crime", "Thriller"],
  "directors": ["Vince Gilligan"],
  "productionCountries": ["USA"]
}
```

## Gestion des données

- Les données sont récupérées depuis une API à l'aide de `fetch()`.
- Les favoris sont sauvegardés dans `localStorage`.
- L'application utilise des modules JavaScript pour organiser le code.
- Les contenus sont affichés dynamiquement dans le DOM.

## Gestion du projet

### Jira

Lien vers le tableau Jira :

(https://hafssaboukniter2002.atlassian.net/jira/software/projects/CIN/boards/34?filter=assignee+IN+%28712020%3A27811874-0216-49ae-9b16-5fa51f62c703%2C+empty%29&groupBy=none&atlOrigin=eyJpIjoiNTMzMzBmZjUwMzNhNDNmOWEwM2MxYzcyMGQxMjRlNTIiLCJwIjoiaiJ9)

### Déploiement

Lien vers l'application déployée sur Vercel :

https://cin-track-three.vercel.app/

## Installation et lancement

1. Cloner le repository :

```bash
git clone [URL_DU_REPOSITORY]
```

2. Accéder au dossier du projet :

```bash
cd CinéTrack
```

3. Installer les dépendances :

```bash
npm install
```

4. Lancer le projet :

```bash
npm run dev
```
