exports.get = async (req, res) => {
  if (!res.locals.currentUser) return res.redirect("/");
  res.status(200).render("welcome", { role: res.locals.currentRole });
};
