const mysql = require('mysql2/promise');

let connection;

const connectToDatabase = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'sql123',
      database: 'Adrian_inc_db'
    });
  }
  return connection;
};

const endDatabaseConnection = async () => {
  if (connection) {
    await connection.end();
    connection = null; // Reset the connection variable
  }
};

module.exports = {
  connectToDatabase,
  endDatabaseConnection
};
