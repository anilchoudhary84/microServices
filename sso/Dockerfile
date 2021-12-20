FROM node:15

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

VOLUME [ "./sso/:/app" ]
VOLUME [ "/app/node_modules" ]

COPY . ./app

EXPOSE 3200

ENV PORT 3200
CMD ["npm", "start"]