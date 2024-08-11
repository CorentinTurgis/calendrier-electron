# Instructions en cas d'erreur

## 1. Nettoyer le projet

```bash
rm -rf node_modules
rm -rf package-lock.json
rm -rf dist
npm i
```

## 2. Ajuster la configuration de la base de données

**Ouvrez le fichier ./src/back/models/db.ts et ajustez la configuration pour votre base de données.**

```ts
export const db: Connection = createConnection({
  host: "localhost",
  user: "test",
  password: "Rootroot51",
  database: "my_calendar",
});
```

## 3. Selectionner la page voulus dans createWindow.ts

**Ouvrez le fichier ./src/back/utils/createWindow.ts et remplacez la ligne suivante pour charger la page HTML correcte :**

```ts
mainWindow.loadFile("./src/front/pages/nomDeLaPage/NomDeLaPage.html");
```

## 4. Démarrer le projet en mode développement

```bash
npm run dev
```
