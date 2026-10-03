FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Prisma generate
RUN npx prisma generate

EXPOSE 3000 8080

CMD ["npm", "run", "start"]