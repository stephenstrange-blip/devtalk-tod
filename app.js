const pg = require("pg");
const path = require("node:path");

const pgPool = require("./db/database").pool;
const indexRouter = require("./routes/route");
const middleware = require("./controllers/appController").middleware;

const express = require("express");
const passport = require("passport");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);

require("dotenv").config();

const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// https://github.com/jaredhanson/passport/issues/14#issuecomment-4863459
app.use(
  expressSession({
    store: new pgSession({
      pool: pgPool,
      createTableIfMissing: true,
      tableName: "user-sessions",
    }),
    secret: "sample",
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use("/", middleware, indexRouter);

app.listen(8080, "localhost", () => {
  console.log(`Server listening at http://localhost:8080`);
});
