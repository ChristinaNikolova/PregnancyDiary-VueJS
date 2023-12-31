const Article = require("../models/Article");
const {
  articleListViewModel,
  articleAdminViewModel,
  articleDetailsViewModel,
} = require("../utils/mapper/article");

async function all(take, skip, searchedQuery) {
  return (
    await Article.find(
      searchedQuery ? { title: { $regex: searchedQuery, $options: "i" } } : {}
    )
      .populate("category", "name")
      .sort({ createdAt: -1, title: 1 })
      .skip(skip)
      .limit(take)
  ).map(articleListViewModel);
}

async function allAdmin() {
  return (
    await Article.find({})
      .populate("category", "name")
      .sort({ createdAt: -1, title: 1 })
  ).map(articleAdminViewModel);
}

async function getById(id) {
  const article = await Article.findById(id).populate("category", "name");
  return articleDetailsViewModel(article);
}

async function getByIdAdmin(id) {
  const article = await Article.findById(id);
  return article;
}

async function create(title, content, picture, category) {
  let article = await getByTitle(title);
  if (article) {
    throw new Error(errors.TITEL_TAKEN);
  }
  article = new Article({
    title,
    content,
    picture,
    category,
  });

  await article.save();
  return article;
}

async function deleteById(id) {
  return Article.findByIdAndDelete(id);
}

async function update(id, title, content, picture, category) {
  const article = await getByIdAdmin(id);
  if (article.title.toLowerCase() !== title.toLowerCase()) {
    const result = await getByTitle(title);
    if (result) {
      throw new Error(errors.NAME_TAKEN);
    }
  }
  article.title = title;
  article.content = content;
  article.picture = picture;
  article.category = category;

  await article.save();
  return article;
}

async function getTotalCount(searchedQuery) {
  return (
    await Article.find(
      searchedQuery ? { title: { $regex: searchedQuery, $options: "i" } } : {}
    )
  ).length;
}

async function like(id, userId) {
  const article = await Article.findById(id);

  if (article.likes.includes(userId)) {
    const index = article.likes.indexOf(userId);
    article.likes.splice(index, 1);
  } else {
    article.likes.push(userId);
  }

  return article.save();
}

async function getByTitle(title) {
  return await Article.findOne({ title }).collation({
    locale: "en",
    strength: 2,
  });
}

module.exports = {
  all,
  getTotalCount,
  create,
  allAdmin,
  deleteById,
  getById,
  getByIdAdmin,
  update,
  like,
};
