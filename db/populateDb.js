const { Client } = require("pg");
const { argv } = require("node:process");
const bcrypt = require("bcrypt");

const QUERIES = {
  CREATE_CLUB: "INSERT INTO club (name, passcode) VALUES ( $1, $2 ) ",
  CREATE_ADMIN_ROLE: "INSERT INTO roles (name) VALUES ('Admin'), ('User')",
};

const client = new Client({
  connectionString: `postgresql://${argv[2]}:${argv[3]}@${argv[4]}:${argv[5]}/${argv[6]}`,
});

async function initClub() {
  console.log("Adding default club credentials");
  const hashed = await bcrypt.hash(argv[6], 5);

  try {
    await client.connect();
    await client.query(QUERIES.CREATE_CLUB, ["devtalk", hashed]);
    console.log("Successfully added default club credentials");
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
}

async function initRoles() {
  console.log("Adding default roles");

  try {
    await client.connect();
    await client.query(QUERIES.CREATE_ADMIN_ROLE);
    console.log("Successfully added default roles");
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
}

initClub();
initRoles();
