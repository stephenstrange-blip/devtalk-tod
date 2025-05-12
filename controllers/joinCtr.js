const { getPassCode } = require("../db/database");

exports.get = async (req, res) => {
  res.render("join");
};

exports.post = async (req, res) => {
  const { passcode } = req.body;

  try {
    const { rows } = await getPassCode();
    const db_passcode = rows[0].passcode;

    if (db_passcode !== passcode) {
      res.locals.isMember = true;
      res.render("join", { message: "Incorrect Passcode!" });
      return;
    }

    res.locals.isMember = true;
    res.redirect("/welcome");
  } catch (err) {
    console.log(err);
    res.locals.isMember = true;
    res.redirect(400, "/login");
  }
};
