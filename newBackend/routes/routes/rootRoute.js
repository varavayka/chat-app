const { Router } = require("express");
const rootController = require("../../controllers/rootController");
const route = Router();
route.get("/", rootController);
module.exports = route;
