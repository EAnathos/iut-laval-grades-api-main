# IUT Laval Grades

App de gestion des notes pour l'IUT de Laval. Cette API permet aux professeurs de gérer les notes des étudiants et de générer des relevés de notes.

## Fonctionnalités

- 🔐 Authentification JWT
- 📊 Gestion des notes
- 📝 Génération de relevés en PDF
- 📈 Statistiques par étudiant/cours
- 📚 Documentation Swagger

## Documentation

La documentation de l'API est disponible ici : [https://itsalexousd.github.io/iut-laval-grades-api/](https://itsalexousd.github.io/iut-laval-grades-api/)

## Installation

1. Cloner le dépôt
2. Installer les dépendances : `npm install`
3. Créer un fichier `.env` à la racine du projet et y ajouter les variables d'environnement (voir `.env.example`)
4. Lancer le serveur : `npm run dev`
5. L'app est accessible à l'adresse : `http://localhost:3000`

## Tests

Pour lancer les tests, il faut build l'app et lancer la commande suivante :

```bash
npm run build && npm run start
```

### Tests unitaires

Dans un autre terminal :

```bash
npm run dev:test
```

### Tests end-to-end

Dans un autre terminal :

```bash
npm run e2e:test
```

## Technologies

- Next.js
- Express
- TypeScript
- TurboRepo
- Jest
- Playwright
- GitHub Actions (CI/CD)
- Swagger
- PDFKit

## Auteur

- Tanguy DAVID
- Antoine JOSSET
- Alex LEMOINE
- Nathaël MARTINELLE
