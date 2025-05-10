const { Pool } = require("pg");
const { argv } = require("node:process");
require("dotenv").config();

const DB = {
  PORT: process.env.DB_PORT,
  HOST: process.env.HOST,
  USER: process.env.USER,
  NAME: process.env.DB_NAME,
};

const pool = new Pool({
  connectionString: `postgresql://${DB.USER}:${argv[2]}@${DB.HOST}:${DB.PORT}/${DB.NAME}`,
});

const addUser = async ({ firstName, lastName, username, password }) => {
  const result = await pool.query(
    "INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, password]
  );

  return result;
};

module.exports = { addUser };
