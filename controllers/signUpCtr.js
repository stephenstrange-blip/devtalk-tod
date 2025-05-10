const { addUser } = require("../db/database");

exports.get = async (req, res) => {
  res.status(200).render("sign-up");
};

exports.post = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, userName, password } = req.body;

  try {
    const result = await addUser({
      firstName,
      lastName,
      username: userName,
      password,
    });
    console.log(result);
    res.status(200).redirect("/");
  } catch (err) {
    console.log(error);
    res.status(400).redirect("/");
  }
};
