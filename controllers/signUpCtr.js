exports.get = async (req, res) => {
  res.status(200).render("sign-up");
};

exports.post = async (req, res) => {
  console.log(req.body);
  res.status(200).redirect("/");
};
