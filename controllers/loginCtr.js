exports.get = async (req, res) => {
  if (req.session.messages) console.log("Message: ", req.session.messages);
  if (res.locals.currentUser) return res.redirect("/welcome");
  res.render("log-in");
};
