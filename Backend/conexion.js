const mysql = require('mysql2/promise'); // npm install mysql2

const {DBNAME, DBUSER, DBHOST} = process.env;

const db = mysql.createPool({
  host: DBHOST,
  user: DBUSER,
  database: DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = db;