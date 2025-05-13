exports.controller = async (req, res) => {
  if (req.session.messages) console.log(req.session.messages);
  if (res.locals.currentUser) return redirect("/welcome");
  res.status(200).render("index");
};
