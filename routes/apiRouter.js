const apiRouter = require("express").Router();
const gamesRouter = require("./games");

const authRouter = require("./auth");
const categoriesRouter = require("./categories");
const usersRouter = require("./users");



apiRouter.use("/api", usersRouter);
apiRouter.use("/api", gamesRouter);
apiRouter.use("/api", categoriesRouter);
apiRouter.use("/api", authRouter); // Добавляем роутер для аутентификации

module.exports = apiRouter; 

