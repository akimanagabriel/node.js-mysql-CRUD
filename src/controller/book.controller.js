const express = require("express");
const bookRouter = express.Router();
const bookService = require("../service/book.service");

// read all books
bookRouter.get("/", async (req, res) => {
  const [books] = await bookService.getAllBooks();
  if (books.length === 0)
    return res.status(404).json({ message: "No book found" });
  else return res.status(200).json(books);
});

// get a single book
bookRouter.get("/:id", async (req, res) => {
  const [[book]] = await bookService.getSingleBook(req.params.id);
  if (!book)
    return res
      .status(404)
      .json({ message: "No book found wint id : " + req.params.id });
  return res.status(200).json(book);
});

// create a book
bookRouter.post("/", async (req, res) => {
  const book = req.body;
  if (!book) return res.status(400).json({ message: "book data is required!" });
  const [{ affectedRows }] = await bookService.createBook(book);
  return res.status(201).json({ message: "book created", affectedRows });
});

// update book
bookRouter.put("/:id", async (req, res) => {
  const [{ affectedRows }] = await bookService.updateBook(
    req.body,
    req.params.id
  );
  if (affectedRows === 0)
    return res
      .status(404)
      .json({ message: "No book found with id = " + req.params.id });
  return res.json({ message: "updated", affectedRows });
});

// delete book
bookRouter.delete("/:id", async (req, res) => {
  const [{ affectedRows }] = await bookService.deleteBookById(req.params.id);
  if (affectedRows === 0)
    return res
      .status(404)
      .json({ message: "no book found with id :" + req.params.id });
  else return res.json({ message: "deleted", affectedRows });
});

module.exports = bookRouter;
