// Создаём роут для запросов категорий 
const categoriesRouter = require('express').Router();
const { Authorize } = require("../middlewares/auth.js");
// Импортируем вспомогательные функции
const {
  createCategory,
  findAllCategories,
  findCategoryById,
  updateCategory,
  deleteCategory,
  checkEmptyName,
  checkIsCategoryExists,
} = require("../middlewares/categories");
const {
  sendCategoryCreated,
  sendAllCategories,
  sendCategoryById,
  sendCategoryUpdated,
  sendCategoryDeleted,
} = require("../controllers/categories");


categoriesRouter.get("/categories", findAllCategories, sendAllCategories);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
categoriesRouter.put(
  "/categories/:id",
    Authorize,
  findAllCategories,
  checkIsCategoryExists,
  checkEmptyName,

  createCategory,
  sendCategoryCreated,
  updateCategory,
  sendCategoryUpdated
);

categoriesRouter.delete(
  "/categories/:id",
  Authorize,

  deleteCategory,
  sendCategoryDeleted
); 

module.exports = categoriesRouter;