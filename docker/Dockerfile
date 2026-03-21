# Dockerfile
FROM node:22

WORKDIR /usr/src/app

# Copia package.json e lock
COPY package*.json ./

# Installa dipendenze
RUN npm install

# Copia tutto il progetto
COPY . .

# Genera Prisma client
RUN npx prisma generate

# Esponi la porta del WebSocket
EXPOSE 8080

# Comando per avviare il backend
CMD ["npm", "run", "dev"]