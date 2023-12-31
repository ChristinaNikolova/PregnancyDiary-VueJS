const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const articlesController = require("../controllers/articles");
const categoriesController = require("../controllers/categories");
// const commentsController = require("../controllers/comments");
// const usersController = require("../controllers/users");
const adminArticlesController = require("../controllers/admin/articles");
const adminCategoriesController = require("../controllers/admin/categories");

module.exports = (app) => {
  app.use(homeController);
  app.use("/auth", authController);
  app.use("/articles", articlesController);
  app.use("/categories", categoriesController);
  //   app.use("/comments", commentsController);
  //   app.use("/users", usersController);
  app.use("/admin/articles", adminArticlesController);
  app.use("/admin/categories", adminCategoriesController);
};
