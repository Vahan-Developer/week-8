// Файл routes/games.js
const { Authorize } = require("../middlewares/auth.js");
const gamesRouter = require('express').Router();

const {
  createGame,
  findAllGames,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIsGameExists,
  voteGame,
  unvoteGame,
} = require("../middlewares/games");;

const {
  sendGameCreated,
  sendAllGames,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted,
  sendVoteResult,
} = require("../controllers/games");

gamesRouter.post(
  "/games",
  Authorize,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  findAllGames,
  checkIsGameExists,
  createGame,
  sendGameCreated,
);

gamesRouter.put(
  "/games/:id",
  Authorize,
  checkAdmin,
  checkEmptyFields,
  findGameById,
  checkIfCategoriesAvaliable,
  findAllGames,
  checkIsGameExists,
  updateGame,
  sendGameUpdated,
);

gamesRouter.delete(
  "/games/:id",
  Authorize,
  deleteGame,
  sendGameDeleted,
);
gamesRouter.post("/games/:id/vote", Authorize, voteGame, sendVoteResult);
gamesRouter.post("/games/:id/unvote", Authorize, unvoteGame, sendVoteResult);
gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById);

  module.exports = gamesRouter;