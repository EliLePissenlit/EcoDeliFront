# Stage de build
FROM node:20-alpine as builder

WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

# Build de l'application
RUN npm run build

# Stage de production
FROM nginx:alpine

# Copie des fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Image de base Node.js
FROM node:20-alpine

WORKDIR /app

# Copie des fichiers de production
COPY dist/ ./dist/
COPY package*.json ./

# Installation des dépendances de production uniquement
RUN npm install --production

# Exposition du port
EXPOSE 3000

# Démarrage de l'application
CMD ["npm", "start"] 