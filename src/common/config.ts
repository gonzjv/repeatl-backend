import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const {
  PORT_NODE_HOST,
  PORT_NODE_CONTAINER,
  PORT_POSTGRES_HOST,
  PORT_POSTGRES_CONTAINER,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_URL,
  POSTGRES_HOST,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
} = process.env;

export {
  PORT_NODE_HOST,
  PORT_NODE_CONTAINER,
  PORT_POSTGRES_HOST,
  PORT_POSTGRES_CONTAINER,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_URL,
  POSTGRES_HOST,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
};
