exports.get = async (req, res) => {
  if (!req.user) return res.status(200).render("index");
  res.status(200).render("welcome");
};
