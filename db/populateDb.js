const { Client } = require("pg");
const { argv } = require("node:process");
const bcrypt = require("bcrypt");

const QUERIES = {
  CREATE_ADMIN: "INSERT INTO club (name, passcode) VALUES ( $1, $2 ) ",
};

const client = new Client({
  connectionString: `postgresql://${argv[2]}:${argv[3]}@${argv[4]}:${argv[5]}/${argv[6]}`,
});

async function initClub() {
  console.log("Adding default club credentials");
  const hashed = await bcrypt.hash(argv[6], 5);

  try {
    await client.connect();
    await client.query(QUERIES.CREATE_ADMIN, ["devtalk", hashed]);
    await client.end();
    console.log("Successfully added default club credentials");
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
}

initClub();
