const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  uri: process.env.MYSQL_PUBLIC_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL Connection Failed", process.env.MYSQL_PUBLIC_URL);
    console.error(error.message);
  }
}

connectDB();

module.exports = pool;