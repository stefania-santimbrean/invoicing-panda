$`docker compose -f ./docker/postgresql.yml down`;
$`docker compose -f ./docker/postgresql.yml up -d`;
$`yarn typeorm migration:run -d ./db/typeorm.config.ts`;
$`yarn seed:db`;
$`yarn test`;
