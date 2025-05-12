exports.get = async (req, res) => {
  console.log(res.locals);
  if (!res.locals.currentUser) return res.redirect("/");
  res.status(200).render("welcome");
};
