const Article = require("../models/Article");
const Comment = require("../models/Comment");
const { commentViewModel } = require("../utils/mapper/comment");

async function all(articleId) {
  const article = await Article.findById(articleId).populate({
    path: "comments",
    populate: {
      path: "creator",
    },
  });

  return article.comments
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(commentViewModel);
}

async function create(articleId, userId, content) {
  const comment = new Comment({
    content,
    creator: userId,
  });
  const result = await comment.save();
  const article = await Article.findById(articleId);
  article.comments.push(result._id);
  await article.save();
  return result;
}

async function like(id, userId) {
  const comment = await Comment.findById(id);

  if (comment.likes.includes(userId)) {
    const index = comment.likes.indexOf(userId);
    comment.likes.splice(index, 1);
  } else {
    comment.likes.push(userId);
  }
  return comment.save();
}

async function deleteById(id) {
  return Comment.findByIdAndDelete(id);
}

module.exports = {
  all,
  create,
  like,
  deleteById,
};
