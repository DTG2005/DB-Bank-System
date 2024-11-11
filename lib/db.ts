// This is a placeholder, because currently, database is not defined well. We will take the database when we choose an online provider.

import mysql2 from "mysql2/promise";

export const db = mysql2.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});