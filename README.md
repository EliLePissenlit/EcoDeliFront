# 🚀 Node.js/TypeScript/GraphQL Ecodeli frontend

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![MUI](https://img.shields.io/badge/MUI-0081CB?style=for-the-badge&logo=mui&logoColor=white)

Modern and scalable Ecodeli app built with Node.js, TypeScript, and GraphQL.

## 🏗 Architecture

### Core Architecture

The application follows a three-layer architecture:

**Pages** → **Sections** → **Components**

**Pages**: Contain the page components
**Sections**: Contain the section components
**Components**: Contain the component

### Directory Structure

```
└── ecodeli-frontend
    └── 📁public
    └── 📁src
        └── app.tsx
        └── 📁assets
        └── 📁components
        └── config-global.ts
        └── 📁contexts
        └── global.css
        └── 📁hooks
        └── 📁layouts
        └── 📁locales
        └── main.tsx
        └── 📁pages
        └── 📁routes
        └── 📁sections
        └── 📁services
        └── 📁theme
        └── 📁types
        └── 📁utils
        └── vite-env.d.ts
    └── .editorconfig
    └── .env
    └── .env.production
    └── .env.staging
    └── .eslintignore
    └── .eslintrc
    └── .gitignore
    └── .gitlab-ci.yml
    └── .prettierignore
    └── .prettierrc
    └── codegen.ts
    └── cspell.json
    └── deploy.staging.yaml
    └── deploy.yaml
    └── Dockerfile
    └── Dockerfile.staging
    └── index.html
    └── nginx.conf
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.json
    └── tsconfig.node.json
    └── vite.config.ts
```

## 🛠 Technologies

### Core

- **Runtime**: Node.js 20
- **Apollo query language**: Generated from GraphQL schema (backend)
- **MUI**: React components library
- **Vite**: React build tool
- **Form validation**: Yup

## ⚙️ Configuration

The project uses the .env file for environment variables.

- .env: Local environment variables
- .env.staging: Staging environment variables
- .env.production: Production environment variables

## 🔧 Development

### Available Scripts

```bash
    "generate:types": "graphql-codegen --config codegen.ts --verbose && npm run lint:fix", // Generate types
    "dev": "vite", // Run development server
    "start": "serve -s dist", // Start production server
    "build": "tsc && vite build", // Build project
    "build:deploy": "gcloud builds submit --config deploy.yaml", // Deploy to production
    "build:deploy:staging": "gcloud builds submit --config deploy.staging.yaml", // Deploy to staging
    "lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\"", // Run linting
    "lint:fix": "eslint --fix \"src/**/*.{js,jsx,ts,tsx}\"", // Fix linting errors
    "prettier": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"", // Format code
    "rm:all": "rm -rf node_modules .next out dist build", // Remove all build artifacts
    "re:start": "yarn rm:all && yarn install && yarn dev", // Rebuild and start the development server
    "re:build": "yarn rm:all && yarn install && yarn build", // Rebuild the project
    "re:build-npm": "npm run rm:all && npm install && npm run build", // Rebuild the project
    "dev:host": "vite --host" // Run development server with host
```
