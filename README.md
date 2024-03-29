# invoicing-panda

<img src="invoicing-panda.jpg" width="50%" height="50%">
<a href="https://www.freepik.com/free-vector/cute-panda-hacker-operating-laptop-cartoon-vector-icon-illustration-animal-technology-icon-isolated_35563619.htm#query=panda&position=26&from_view=keyword&track=sph&uuid=54617f49-91c9-4d1b-9f48-3fa12d981f9a">Image by catalyststuff on Freepik</a>

## Description

API that allows for invoices to be managed in a backend system

## Preprequisites (installed once)

**For Mac/Linux:**

```
brew install docker
```

Install Docker Desktop: https://docs.docker.com/desktop/install/mac-install/

```
brew install nvm
```

```
nvm install 20.9.0
nvm use 20.9.0 && nvm alias default 20.9.0`
```

```
npm i -g yarn
```

Some database tool e.g. DBeaver, TablePlus etc. or some Postgres cli e.g. `brew install pgcli`

Some code editor e.g. VSCode.

**For Windows**: same prereq but installed with chocolatey or regular installers

## Installation

```bash
$ yarn install
```

If you use different node version you can do `yarn install --ignore-engines`

## Run the app locally

```
docker compose -f ./docker/postgresql.yml up -d
yarn typeorm migration:run -d ./db/typeorm.config.ts
yarn seed:db
yarn start:dev
docker compose -f ./docker/postgresql.yml down
```

After `yarn start:dev` you can open http://localhost:3000/graphql and call queries or mutations.

## To run tests

```
docker compose -f ./docker/postgresql.yml up -d
yarn typeorm migration:run -d ./db/typeorm.config.ts
yarn seed:db
yarn test
docker compose -f ./docker/postgresql.yml down
```

Or simply run `yarn test:script`

\*creation of data for tests could be integrated in before of tests and cleanup in after, but for simplicity we can create db and delete it after test run

## Migrations commands for devs

Create or generate migration:

`yarn typeorm migration:generate -d ./db/typeorm.config.ts ./db/migrations/init`

`yarn typeorm migration:create ./db/migrations/data`

Run to test it:

`yarn typeorm migration:run -d ./db/typeorm.config.ts`

Revert if needed:

`yarn typeorm migration:revert -d ./db/typeorm.config.ts`
