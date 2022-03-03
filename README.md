
## Description

this is a service that collects data from [cryptocompare.com](cryptocompare.com) using its API and stores it in a MongoDB

## Installation
Before You started ensure that You have `.env` file in root folder with these configurations:  
`MONGODB_URI=https://XXX`    
`MONGODB_DBNAME=data-base-name`    
`MONGODB_USER=Your-usename`    
`MONGODB_PASSWORD=Your-password`    
`CRYPTOCOMPARE_API_KEY=xxxxx1111xxxxx`    


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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

