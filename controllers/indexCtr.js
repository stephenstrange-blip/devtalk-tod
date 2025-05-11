exports.controller = async (req, res) => {
  if (req.session.messages) console.log(req.session.messages);
  res.status(200).render("index");
};
