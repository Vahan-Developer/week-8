// Создаём роут для запросов категорий 
const categoriesRouter = require('express').Router();

// Импортируем вспомогательные функции
const createCategory = require('../middlewares/categories');
const sendCategoryCreated = require('../controllers/categories');
const checkIsCategoryExists = require("../middlewares/categories");
const updateCategory = require("../middlewares/categories");
const sendCategoryUpdated = require('../controllers/categories');
const findAllCategories = require("../middlewares/categories");
const checkEmptyName = require('../middlewares/categories');
const checkAuth = require('../middlewares/categories');
const deleteCategory = require('../middlewares/categories');
const sendCategoryDeleted = require('../controllers/categories');



categoriesRouter.post(
  "/categories",
  findAllCategories,
  checkIsCategoryExists,
  checkEmptyName,
  checkAuth,
  createCategory,
  sendCategoryCreated
);
categoriesRouter.put(
  "/categories/:id",
  checkEmptyName,
  checkAuth,
  updateCategory,
  sendCategoryUpdated
);
categoriesRouter.delete(
  "/categories/:id",
  checkAuth,
  deleteCategory,
  sendCategoryDeleted
); 

module.exports = categoriesRouter;