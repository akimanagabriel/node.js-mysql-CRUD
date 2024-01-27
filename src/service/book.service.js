const db = require("../db/connection");

module.exports.getAllBooks = async () => {
  return await db.query("select * from books");
};

module.exports.getSingleBook = async (id) => {
  return await db.query("SELECT * FROM books WHERE id = ?", [id]);
};

module.exports.createBook = async (book) => {
  return await db.query("INSERT INTO books(`title`, `author`) VALUES (?,?)", [
    book.title,
    book.author,
  ]);
};

module.exports.updateBook = async (book, id) => {
  return await db.query(
    "UPDATE `books` SET `title`= ?,`author`=? WHERE `id` = ?",
    [book.title, book.author, id]
  );
};

module.exports.deleteBookById = async (id) => {
  return await db.query("DELETE FROM `books` WHERE `id` = ?", [id]);
};
