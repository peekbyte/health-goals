FROM node:23-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5001
CMD ["node", "index.js"]
