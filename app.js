const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const categoriesRouter = require('./routes/categories');
const authRouter = require('./routes/auth');
const cookieParser = require("cookie-parser");

const connectToDatabase = require('./database/connect');
const cors = require('./middlewares/cors');

const app = express();


// Создание экземпляра маршрутизатора API
const apiRouter = express.Router();

connectToDatabase();

app.use(
  cors,
  cookieParser(),
  bodyParser.json(),
  pagesRouter, // Добавляем роутер для страниц
  apiRouter,
  express.static(path.join(__dirname, "public"))
);


// Настройка маршрутов API
apiRouter.use("/api", gamesRouter);
apiRouter.use("/api", usersRouter);
apiRouter.use("/api", categoriesRouter);
apiRouter.use("/api", authRouter);

const PORT = 3001;
app.listen(PORT); 


