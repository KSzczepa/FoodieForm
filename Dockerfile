FROM node:14 AS Production

ENV NODE_ENV=production
 
WORKDIR /usr/src/foodieform

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm start"]
# CMD ["sh", "-c", "npm run start:production"]
EXPOSE 5000