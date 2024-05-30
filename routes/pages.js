// routes/pages.js
const pagesRouter = require("express").Router();
const { sendIndex } = require("../controllers/auth.js");
const sendDashboard = require("../controllers/auth");
const checkCookiesJWT = require("../middlewares/auth");
const checkAuth = require("../middlewares/auth");
const sendDashboard = require("../controllers/auth");


pagesRouter.get("/admin/**", sendDashboard); 
pagesRouter.get("/", sendIndex);
pagesRouter.get("/admin/**", checkCookiesJWT, checkAuth, sendDashboard); 
module.exports = pagesRouter;