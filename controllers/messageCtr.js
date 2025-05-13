const { logMessage, addMessage } = require("../db/database");

exports.get = async (req, res) => {
  if (!res.locals.currentUser) return res.redirect("/");
  res.render("addMessage");
};

exports.post = async (req, res) => {
  try {
    const { title, msg_body } = req.body;
    if (!title) throw new Error("Title is missing!");

    const result = await addMessage(title, msg_body);
    const _result = await logMessage(result.rows[0].id, res.locals.currentUser);

    console.log(_result);
    res.status(200).redirect("/welcome");
  } catch (err) {
    console.log(err);
    res.status(300).redirect("/welcome");
  }
};
