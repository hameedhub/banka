import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgres://bfvbzggj:kT9e4RXweJwaqqGGJJxxYyDW0H72QnHT@isilo.db.elephantsql.com:5432/bfvbzggj',
});

class Model {
  constructor() {

    this.pool = pool;
  }

  async query(query, values) {
    try {
      const req = await this.pool.query(query, values);
      return req;
    } catch(err) {
      console.log(err.message);
    }
  }

}

export default Model;
