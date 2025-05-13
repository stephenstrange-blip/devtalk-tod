exports.middleware = async (req, res, next) => {
  const sessionMsg = req.session.messages;

  console.log(req.url);

  if (sessionMsg && sessionMsg.length > 1) {
    req.session.messages.shift();
  }

  if (req.user) {
    res.locals.currentUser = req.user.id;
    res.locals.currentRole = req.user.roles ? req.user.roles[0] : null;
  }
  next();
};
