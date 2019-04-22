import { parse } from 'pg-connection-string';
const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();

const createTables = () => {
  const userTable = `  
  CREATE TABLE IF NOT EXISTS
   users(
    id SERIAL PRIMARY KEY,
      email VARCHAR(128) UNIQUE NOT NULL,
      firstname VARCHAR(128) NOT NULL,
      lastname VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      type VARCHAR(128) NOT NULL,
      isAdmin BOOLEAN
  );
  `;
  const accountTable = `CREATE TABLE IF NOT EXISTS
  accounts (
    id SERIAL PRIMARY KEY,
    accountNumber BIGINT UNIQUE,
    createdOn VARCHAR(50),
    ownerEmail VARCHAR,
    type VARCHAR(10),
    status VARCHAR(10),
    balance FLOAT
  )`;
  const transactionTable =
  `CREATE TABLE IF NOT EXISTS
  transactions (
    id SERIAL PRIMARY KEY UNIQUE,
    createdOn VARCHAR(40),
    type VARCHAR(10),
    accountNumber BIGINT,
    cashier INTEGER,
    amount FLOAT,
    oldBalance FLOAT,
    newBalance FLOAT
  )`;
}

  pool.query(sql)
    .then((res) => {
      console.log('table created', res);
      pool.end();
    })
    .catch((err) => {
      console.log('error', err);
      pool.end();
    });
};

export default createTables;

