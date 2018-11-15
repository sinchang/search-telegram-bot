FROM node:dubnium

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install --prod
COPY . /usr/src/app

ENTRYPOINT ["npm", "start"]
