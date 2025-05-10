const path = require("node:path");
const express = require("express");
const { argv } = require("node:process");
const { indexRouter } = require("./routes/route");

require("dotenv").config();

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", indexRouter);

app.listen(8080, "localhost", () => {
  console.log(`Server listening at http://localhost:8080`);
});
