import { DataSource } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from './src/common/config';

const repeatlDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5000,
  //   username: "test",
  username: POSTGRES_USER,
  //   password: "test",
  password: POSTGRES_PASSWORD,
  //   database: "test",
  database: POSTGRES_DB,
  entities: ['src/entity/*.js'],
  logging: true,
  synchronize: true,
});

export default repeatlDataSource;
