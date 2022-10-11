import { DataSource } from 'typeorm';
import {
  PORT_POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_URL,
  POSTGRES_USER,
} from './src/common/config';

export const repeatlDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  url: POSTGRES_URL,
  port: Number(PORT_POSTGRES_HOST),
  // port: 5432,
  //   username: "test",
  username: POSTGRES_USER,
  //   password: "test",
  password: POSTGRES_PASSWORD,
  //   database: "test",
  database: POSTGRES_DB,
  entities: ['src/entity/*.ts'],
  migrations: ['src/migrations/*.ts'],
  logging: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

// export default repeatlDataSource;
