# invoicing-panda

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
