const { getPassCode, updateRole } = require("../db/database");

exports.get = async (req, res) => {
  if (!res.locals.currentUser) return res.redirect("/index");
  if (res.locals.currentRole.id === 1) return res.redirect("/welcome");
  res.render("join");
};

exports.post = async (req, res) => {
  const { passcode } = req.body;

  try {
    const { rows } = await getPassCode();
    const db_passcode = rows[0].passcode;

    if (db_passcode !== passcode) {
      res.render("join", { message: "Incorrect Passcode!" });
      return;
    }

    const result = await updateRole(res.local.currentUser);
    console.log(result);
    res.redirect("/welcome");
  } catch (err) {
    console.log(err);
    res.redirect(400, "/login");
  }
};
