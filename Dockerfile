FROM node:latest

WORKDIR /usr/Docker

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
