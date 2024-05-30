
const usersRouter = require('express').Router();

const createUser = require('../middlewares/users');
const checkIsUserExists = require("../middlewares/users");
const sendUserCreated = require('../controllers/users');

const checkEmptyNameAndEmail = require('../middlewares/users');
const updateUser = require("../middlewares/users");
const sendUserUpdated = require('../controllers/users');
const findAllUsers = require("../middlewares/users");
const checkEmptyNameAndEmailAndPassword = require('../middlewares/users');
const deleteUser = require('../middlewares/users');
const checkAuth = require('../middlewares/users');
const sendUserDeleted = require('../controllers/users');
const hashPassword = require('../middlewares/users');
const sendMe = require('../controllers/users');


usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);
usersRouter.delete(
    "/users/:id",
    checkAuth,
    deleteUser,
    sendUserDeleted
); 
usersRouter.get("/me", checkAuth, sendMe);
module.exports = usersRouter;