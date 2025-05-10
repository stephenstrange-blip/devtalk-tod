const { Router } = require("express");
const indexController = require("../controllers/indexCtr").controller;
const signUpController = require("../controllers/signUpCtr");

const indexRouter = new Router();
indexRouter.get("/", indexController);

indexRouter.get("/sign-up", signUpController.get);
indexRouter.post("/sign-up", signUpController.post);

module.exports = indexRouter;
