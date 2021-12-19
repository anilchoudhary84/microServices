FROM node:15

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . ./app

EXPOSE 3300

ENV PORT 3300
CMD ["npm", "start"]