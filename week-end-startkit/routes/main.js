const fs =  require("fs").promises;

const mainRoute = require("express").Router();

mainRoute.get("/", (req, res) => {
fs.readFile("./public/index.html", "utf-8").then((data) => {

  res.header("Content-Type", "text/html").send(data);
});
});

module.exports = mainRoute;

const gameRoute = require('express').Router();

const getAllGames = (req, res) => {}
const deleteGame = async (req, res) => {}
const addGame = async (req, res) => {}

gameRoute.post('/games', addGame);
gameRoute.get('/games', getAllGames);
gameRoute.delete('/games', deleteGame);

module.exports = gameRoute;