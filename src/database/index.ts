import { createConnection } from 'typeorm';
import { config } from 'dotenv';

config();

const { MODE } = process.env;

if (MODE === 'development') {
  createConnection();
} else {
  const {
    HOSTNAME,
    PORT_DATABASE,
    USER_DATABASE,
    PASSWORD,
    DATABASE,
  } = process.env;
  createConnection({
    type: 'postgres',
    host: HOSTNAME,
    username: USER_DATABASE,
    password: PASSWORD,
    database: DATABASE,
    port: Number(PORT_DATABASE),
  });
}

console.log(`Mode: ${MODE}`);
