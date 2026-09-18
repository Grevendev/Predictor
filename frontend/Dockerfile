FROM node:24-slim

WORKDIR /app

# Installera beroenden först för bättre lager-caching
COPY package*.json ./
RUN npm install

# Kopiera källkoden
COPY . .


EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]