const bcrypt = require("bcrypt");
const passport = require("passport");
const pool = require("./database").pool;
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      if (!username || !password) {
        return done(null, false, {
          message: "Missing input",
        });
      }

      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Correct password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("user in serializeUser is", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];


    const result = await pool.query(
      "SELECT r.id, r.name FROM roles AS r INNER JOIN user_roles AS ur ON ur.role_id = r.id WHERE ur.user_id = $1 ORDER BY ur.role_id",
      [user.id]
    );

    user.roles = result.rows;
    console.log("user.roles = ", user.roles);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports.LocalStrategy = LocalStrategy;
