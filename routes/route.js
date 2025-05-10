const { Router } = require("express");
const indexController = require("../controllers/indexCtr").controller;
const signUpController = require("../controllers/signUpCtr");
const passport = require("passport");
const LocalStrategy = require("../db/passport").LocalStrategy;

const indexRouter = new Router();
indexRouter.get("/", indexController);

indexRouter.get("/sign-up", signUpController.get);
indexRouter.post("/sign-up", signUpController.post);

indexRouter.get("/login", (req, res) => res.render("log-in"));
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/welcome",
    successMessage: true,
    failureRedirect: "/",
    failureMessage: true,
  })
);

indexRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});



module.exports = indexRouter;
