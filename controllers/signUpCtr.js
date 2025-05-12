const { addUser } = require("../db/database");
const bcrypt = require("bcrypt");

exports.get = async (req, res) => {
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
    console.log(result);
    res.status(200).redirect("/login");
  } catch (err) {
    console.log(err);
    res.status(400).redirect("/");
  }
};
