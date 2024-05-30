// Файл routes/games.js
const { checkAuth } = require("../middlewares/auth.js");

const gamesRouter = require('express').Router();

const createGame = require('../middlewares/games');
const sendGameCreated = require('../controllers/games');
const findAllGames = require("../middlewares/games");
const findGameById = require("../middlewares/games");

const checkIsVoteRequest = require("../middlewares/games");
const checkIsGameExists = require("../middlewares/games");
const checkIfCategoriesAvaliable = require("../middlewares/games");
const checkEmptyFields = require("../middlewares/games");
const checkIfUsersAreSafe = require("../middlewares/games");

gamesRouter.post(
  "/games",
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth
  // Другие миддлвары и контроллеры
);

// Маршрут для обновления игры
gamesRouter.put(
  "/games/:id",
  findGameById,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  // Другие миддлвары и контроллеры
);

// Маршрут для удаления игры
gamesRouter.delete(
    "/games/:id", 
    checkAuth
    // Другие миддлвары и контроллеры
); 

  module.exports = gamesRouter;