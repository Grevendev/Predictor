FROM node:24-slim

WORKDIR /app

# Installera beroenden först för bättre lager-caching
COPY package*.json ./
RUN npm install

# Kopiera källkoden
COPY . .
COPY --from=builder /app/dist /usr/share/nginx/html/predictor
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]