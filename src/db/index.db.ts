import { Client } from "pg";
import { dbSource } from "../environments/environments";
const { Pool } = require("pg");
// const config = {
//   user: `${dbUser}`,
//   host: `${dbHost}`,
//   database: `${dbDatabase}`,
//   password: `${dbPassword}`,
//   port: `${dbPort}`,
// };
const config = {
  connectionString: dbSource,
  ssl: {
    rejectUnauthorized: false
  }
};
const pool = new Pool(config);
pool.on("error", (err: Error, client: Client) => {
  console.error("Error:", err);
});
console.log(config);
export const dbQuery = (text: string, params: any) => pool.query(text, params);



