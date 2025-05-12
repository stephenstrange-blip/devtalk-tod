exports.get = async (req, res) => {
  if (req.session.messages) console.log("Message: ", req.session.messages);
  res.render("log-in");
};
