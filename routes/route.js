const { Router } = require("express");
const indexController = require("../controllers/indexCtr").indexController;

const indexRouter = new Router();
indexRouter.get("/", indexController);

module.exports = { indexRouter };
