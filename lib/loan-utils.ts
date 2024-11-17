import mysql2 from 'mysql2/promise';

// Create and export MySQL connection pool using environment variables
export const pool = mysql2.createPool({
  host: process.env.DB_HOST, // Replace with your MySQL host
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER, // Replace with your MySQL user
  password: process.env.DB_PASSWORD, // Replace with your MySQL password
  database: process.env.DB_DATABASE, // Replace with your database name
});
