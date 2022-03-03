
## Description

this is a service that collects data from [cryptocompare.com](cryptocompare.com) using its API and stores it in a MongoDB  

your app locally is on [3000 port](http://localhost:3000/), also description of task is there.

#### API
api endpoint descriptions are in [http://localhost:3000/api](http://localhost:3000/api)

#### Websocket
Websocket playground is in [http://localhost:3000/websocket](http://localhost:3000/websocket) .
Websocket connection for js client is available by [http://localhost:3000](http://localhost:3000) address e.g.: 
```javascript
const socket = io('http://localhost:3000')
socket.on('message', (message) => {
  console.log(message);
})
```

## Installation
Before You started ensure that You have `.env` file in root folder with these configurations:  
```shell
MONGODB_URI=https://XXX
MONGODB_DBNAME=data-base-name
MONGODB_USER=your-usename
MONGODB_PASSWORD=your-password
CRYPTOCOMPARE_API_KEY=xxxxx1111xxxxx  
```     


Don't forget run 
```bash
$ npm install
```
for install all npm packages

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# Docker development
$ docker-compose up dev

# Docker development (rebuild)
$ docker-compose up --build dev

# Docker production
$ docker-compose up --build prod
```

[//]: # (## Test)
[//]: # ()
[//]: # (```bash)
[//]: # (# unit tests)
[//]: # ($ npm run test)
[//]: # ()
[//]: # (# e2e tests)
[//]: # ($ npm run test:e2e)
[//]: # (```)

