const users = require("../models/user");
const bcrypt = require("bcryptjs"); // Импортируем bcrypt 
const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
const findAllUsers = async (req, res, next) => {
  console.log("GET /api/users");
  req.usersArray = await users.find({}, { password: 0 });
  next();
};
const users = require("../models/user");
 
const createUser = async (req, res, next) => {
  try {
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.status(400).send("Ошибка при создании пользователя");
  }
};
const findUserById = async (req, res, next) => {
  console.log("GET /api/users/:id");
  try {
    req.user = await users.findById(req.params.id, { password: 0 });
    next();
  } catch (error) {
    res.status(404).send("User not found");
  }
};

const updateUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка обновления пользователя" });
  }
}; 

const deleteUser = async (req, res, next) => {
  console.log("DELETE /users/:id");
  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.status(400).send({ message: "Error deleting user" });
  }
}; 
const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Введите имя, email и пароль" }));
  } else {
    next();
  }
};
const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Пользователь с таким email уже существует" }));
  } else {
    next();
  }
};
const checkIfUsersAreSafe = async (req, res, next) => {
  if (!req.body.users) {
    next();
    return;
  }
  if (req.body.users.length - 1 === req.game.users.length) {
    next();
    return;
  } else {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя" }));
  }
};
const filterPassword = (req, res, next) => {
  // Код функции фильтрации
if (req.user) {
  req.user = filterUser(req.user);
}
if (req.usersArray) {
  req.usersArray = req.usersArray.map((user) => filterUser(user));
  next();
}
}; 
  const filterUser = (user) => {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  };
  const hashPassword = async (req, res, next) => {
    try {
      // Создаём случайную строку длиной в десять символов
      const salt = await bcrypt.genSalt(10);
      // Хешируем пароль
      const hash = await bcrypt.hash(req.body.password, salt);
      // Полученный в запросе пароль подменяем на хеш
      req.body.password = hash;
      next();
    } catch (error) {
      res.status(400).send({ message: "Ошибка хеширования пароля" });
    }
  }; 
module.exports = 
findAllUsers,
createUser,
findUserById,
updateUser,
deleteUser,
checkEmptyNameAndEmailAndPassword,
checkIsUserExists,
checkIfUsersAreSafe,
filterPassword,
filterUser,
mongoose.model("user", userSchema),
hashPassword
;