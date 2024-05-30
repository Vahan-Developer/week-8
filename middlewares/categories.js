

const createCategory = async (req, res, next) => {
  console.log("POST /categories");
  try {
    req.category = await categories.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка создания категории" }));
  }
};
const findCategoryById = async (req, res, next) => {
  console.log("GET /categories/:id");
  try {
    req.category = await categories.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "Категория не найдена" }));
  }
};
const updateCategory = async (req, res, next) => {
  try {
    req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка обновления категории" });
  }
}; 
const deleteCategory = async (req, res, next) => {
  console.log("DELETE /categories/:id");
  try {
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка удаления категории" }));
  }
};
const checkEmptyName = async (req, res, next) => {
  if (!req.body.name) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Введите название категории" }));
  } else {
    next();
  }
};
const checkIsCategoryExists = async (req, res, next) => {
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Категория с таким названием уже существует" }));
  } else {
    next();
  }
};
const checkIfCategoriesAvaliable = async (req, res, next) => {
  if (!req.body.categories || req.body.categories.length === 0) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Выберите хотя бы одну категорию" }));
  } else {
    next();
  }
};
const findAllCategories = async (req, res, next) => {
  console.log("GET /categories");
  req.categoriesArray = await categories
    .findById()
    .populate("games")
    .populate({
         path: "users",
         select: "-password"
    });
  next();
};

module.exports = 
createCategory,
findCategoryById,
updateCategory,
deleteCategory,
checkEmptyName,
checkIsCategoryExists,
checkIfCategoriesAvaliable,
findAllCategories;