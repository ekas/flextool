import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseOrmConfig = () => {
  const data: any = process.env;

  const entitiesDir = [__dirname + '/**/*.entity{.js,.ts}'];

  return {
    type: 'postgres',
    database: data.PG_DB,
    port: +data.PG_PORT || 5432,
    username: data.PG_USER,
    password: data.PG_PASS,
    host: data.PG_HOST,
    connectTimeoutMS: 5000,
    extra: {
      max: 25,
    },
    entities: entitiesDir,
    synchronize: true,
    uuidExtension: 'pgcrypto',
    logging: data.ORM_LOGGING || false,
    keepConnectionAlive: true,
  } as TypeOrmModuleOptions;
};
