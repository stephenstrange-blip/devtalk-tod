exports.get = async (req, res) => {
  if (!res.locals.currentUser) return res.redirect("/");
  res.render("addMessage");
};
