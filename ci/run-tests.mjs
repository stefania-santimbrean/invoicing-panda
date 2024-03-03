await $`docker compose -f ./docker/postgresql.yml down`;
await $`docker compose -f ./docker/postgresql.yml up -d`;
await $`yarn typeorm migration:run -d ./db/typeorm.config.ts`;
await $`yarn seed:db`;
await $`yarn test`;
