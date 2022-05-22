# FullStack Exercise

## Server

in `./server` directory

- node as backend
- mongo as database
- bull.js on redis as scheduler

  ## dependencies

  - mongo database on `localhost:27017` with credentials: `root@pass12345`
  - redis database on `localhost:6379`

  ## running server:

  from `./server` directory

  - dependencies can be run with docker-compose : `yarn dev:docker`
  - server can be run with `yarn dev`

## Client

in `./client` directory

- Angular cli project

  ## running client:

  from `./client` directory

  - client can be run with `yarn start`
