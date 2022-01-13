FROM node:15

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

VOLUME [ "./transactions/:/app" ]
VOLUME [ "/app/node_modules" ]
COPY . ./app
# COPY . /app

EXPOSE 3100

ENV PORT 3100
CMD ["npm", "start"]