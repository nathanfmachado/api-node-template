# About this project

This is a simple REST API of products with categories, emulating a simple e-commerce, that can be used as a template. The main technologies used are:
- Typescript
- Express
- Prisma
- Docker
- Swagger

## Prerequisites - Before running this project

- [Install Docker](https://www.docker.com/get-started/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

## Running app

- This app is containerized. To start the app locally, up containers:

```bash
$ docker compose up -d
```

- To stop, run:

```bash
$ docker compose stop
```

## Contributing - running outside container

- Create a .env file and copy the .env.example content

- Install nvm or other node version package manager

- Make sure you are using node v20.10.0 and install packages

```bash
$ nvm use
```

```bash
$ npm install
```
- If containers are running, stop them:

```bash
$ docker compose stop
```

- Comment the `web` and `migration` services on `docker-compose.yml` and run just the database services:

```bash
$ docker compose up -d
```

- Run migrations and start local server 

```bash
$ npm run migrate:generate
```

```bash
$ npm run dev
```

- The app is running on [localhost:4000/](http://localhost:4000/)

## Testing

- End to end tests are not implemented yet, but you can run unit test using:

```bash
$ npm test
```

## API documentation

- This app was documented with Swagger. While running this app, you can see the documentation at [/docs](http://localhost:4000/docs)
