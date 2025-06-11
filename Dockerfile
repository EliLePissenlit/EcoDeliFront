FROM node:20-alpine

WORKDIR /app

# Installation de serve
RUN npm install -g serve

# Copie du dossier dist
COPY dist/ ./dist/

# Exposition du port
EXPOSE 3000

# Lancement de l'app
CMD ["serve", "-s", "dist", "-l", "3000"] 