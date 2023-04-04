# What is this project?
This is the backend part of a task assignemnt to build a search system for an autocomplete input on the frontend. Since the task was indifferent of what kind of data it was supposed to handle I just created my own, which is a list of subjects. Due to time issues I've build only two endpoints, one for create and another for search.

# How to start this application

Run the database with docker:
```
docker compose up -d

# just a reminder close containers in the end
docker compose down
```

Install packages and run the prepared script for local development:
```
npm i

npm run start:dev
```

# How to run tests
To run unit tests it's as simple as:
```
npm run test

# to keep tracking the files
npm run test:watch
```

To run the e2e tests you need to have the database running. It creates an isolated environment using Postgres schemas, it's good to not tamper with data used for development. It automatically drops the database at the end of tests, also it automatically runs all migrations when generating a new schema.
```
npm run test:e2e

# to keep tracking the files
npm run test:e2e:watch
```

Also you can generate coverage report with `npm run test:coverage` and use vitest ui to track tests when developing with `npm run test:ui`.

Note on tests: unit tests uses an in-memory repository, which mimics database behaviour but only with Typescript code, this way the tests runs very fast and it doesn’t need to use vitest mocking.

# How to use this API
This project doesn't have a Swagger document due to time issues, but here are some curl samples:
```
curl --location --request GET 'http://localhost:3333/subjects/search'

curl --location --request POST 'http://localhost:3333/subjects' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Typescript",
    "code": "TS"
}'
```

## The tech stack
This project was built using Fastify, Prisma, Zod and Postgres. Here are the motivations for it's use:
- **Fastify** is very similar to Express, but there are articles mentioning that it's slightly faster than Express. 
- **Prisma** is a very complete ORM and integrates very well with Typescript, which is the programming language chosen for this project.
- **Zod** is just a validator, which also integrates well with Typescript.
- **Postgres** is a open source database with good performance. Also it's very easy to set it up using Docker containers.

### A reminder for Prisma
Prisma generates typing for all models, but you need to refresh the types with `npx prisma generate`. The IDE might complain for first time developers since the types are not yet generated.

To easily check and change data on database use `npx prisma studio`.


