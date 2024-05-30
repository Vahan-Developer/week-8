// routes/pages.js

const pagesRouter = require("express").Router();
const { sendLogin, sendDashboard } = require("../controllers/pages.js");

pagesRouter.get("/admin/**", sendDashboard, checkCookiesJWT); 
pagesRouter.get("/", sendIndex);
pagesRouter.get("/admin/login",  sendLogin);
 
module.exports = pagesRouter;