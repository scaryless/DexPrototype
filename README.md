# Cross-Chain DEX Interface

Une interface DEX avancée pour les échanges cross-chain entre BSC, ETH et Solana, offrant une expérience utilisateur améliorée pour les swaps de crypto-monnaies.

## Fonctionnalités

- 🔄 Swap de tokens entre différentes blockchains
- 💱 Support pour ETH, BSC et Solana
- 📊 Estimation en temps réel des prix
- 🔒 Simulation de connexion de wallet
- ⚙️ Paramètres de slippage personnalisables

## Prérequis

- Node.js v20 ou supérieur
- npm v9 ou supérieur

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/scaryless/DexPrototype.git
cd DexPrototype
```

2. Installez les dépendances :
```bash
npm install
```

## Développement

Pour démarrer le serveur de développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:8080`

## Structure du Projet

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── lib/          # Utilitaires et services
│   │   └── pages/        # Pages de l'application
├── server/                # Backend Express
│   ├── routes.ts         # Routes API
│   └── storage.ts        # Gestion des données
└── shared/               # Code partagé
    └── schema.ts         # Types et schémas
```

## Technologies Utilisées

- Frontend :
  - React + Vite
  - TanStack Query
  - ShadcnUI
  - TypeScript
  - Tailwind CSS

- Backend :
  - Express
  - TypeScript
  - Zod pour la validation

## Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## License

MIT
