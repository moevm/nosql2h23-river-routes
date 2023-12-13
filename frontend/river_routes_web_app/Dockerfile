FROM node:18

COPY . /fe

WORKDIR /fe

RUN npm i --legacy-peer-deps

CMD ["npm", "run", "start"]