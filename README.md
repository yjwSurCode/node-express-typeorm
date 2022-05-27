# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command


sudo pm2 start ts-node ./src/index.ts --name app -i 5 --interpreter ./node_modules/.bin/ts-node


pm2 start pm2.json --env production

ps -ef|grep pm2

pm2 start ecosystem.config.js


npm i --save-dev @types/body-parser
npm i --save-dev @types/express