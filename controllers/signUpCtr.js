const { addUser, updateRole } = require("../db/database");
const bcrypt = require("bcrypt");

exports.get = async (req, res) => {
  if (res.locals.currentUser) return res.redirect("/welcome");
  res.status(200).render("sign-up");
};

exports.post = async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;

  const hashed = await bcrypt.hash(password, 5);

  try {
    const result = await addUser({
      firstName,
      lastName,
      username: userName,
      password: hashed,
    });

    // TODO: REPLACE 4 with the basic level role_id
    const _result = await updateRole(result.rows[0].id, 4);
    console.log(result, _result);
    res.status(200).redirect("/login");
  } catch (err) {
    console.log(err);
    res.status(400).redirect("/");
  }
};
