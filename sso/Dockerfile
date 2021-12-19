FROM node:15

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . ./app

EXPOSE 3200

ENV PORT 3200
CMD ["npm", "start"]