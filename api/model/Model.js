import pool from './database';

const modelObj = {
    async sql(query, values) {
        try {
          return (async () => {
            const client = await pool.connect();
            try {
              return await client.query(query, values);
            } finally {
              client.release();
            }
          })();
        } catch (e) {
          return console.log(e);
        }
      }

};
export default modelObj;
