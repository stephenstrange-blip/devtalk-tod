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

const getPassCode = async () => {
  const result = await pool.query("SELECT passcode FROM club WHERE id = 1");
  return result;
};

const updateRole = async (user_id, role_id) => {
  const result = await pool.query("INSERT INTO user_roles VALUES ( $1, $2 );", [
    user_id,
    role_id,
  ]);
  return result;
};

const addMessage = async (title, message) => {
  const result = await pool.query(
    "INSERT INTO messages (title, message) VALUES ($1, $2) RETURNING id",
    [title, message]
  );
  return result;
};

const getMessages = async () => {
  const result = await pool.query(
    " SELECT u.firstName, u.lastName, m.message, m.title, to_char(l.created, 'Day, DD, Month, YYYY') AS date FROM users AS u INNER JOIN log AS l ON u.id = l.user_id INNER JOIN messages AS m ON l.message_id = m.id;"
  );
  console.log(result);
  return result;
};

const logMessage = async (msg_id, user_id) => {
  const result = await pool.query(
    "INSERT INTO log (message_id, user_id) VALUES ($1, $2)",
    [msg_id, user_id]
  );
  return result;
};

module.exports = {
  addUser,
  getPassCode,
  updateRole,
  addMessage,
  logMessage,
  getMessages,
};
module.exports.pool = pool;