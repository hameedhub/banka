import { pool } from 'pg';

//`CREATE DATABASE banka`

// User table definition..
const userTable = () => {
  const sql = `
    CREATE TABLE Users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        type VARCHAR(128) NOT NULL,
        isAdmin BOOLEAN,
        registered DATE NOT NULL
    );`;
  pool.query(sql).then((res)=>{
    console.log('user table created');
    pool.end();
  }).catch((err)=>{
    console.log(err);
    pool.end();
  })
};