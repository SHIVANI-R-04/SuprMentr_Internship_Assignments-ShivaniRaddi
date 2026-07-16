const express = require("express");
const router  = express.Router();
const db      = require("../data/db");

// GET /books → list all books (optional ?genre= filter)
router.get("/", (req, res) => {
  let result = db.books;
  if (req.query.genre) {
    result = result.filter(b =>
      b.genre.toLowerCase() === req.query.genre.toLowerCase()
    );
  }
  res.json(result);
});

// GET /books/:id → get one book
router.get("/:id", (req, res) => {
  const book = db.books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// GET /books/:id/author → get the author of a book
router.get("/:id/author", (req, res) => {
  const book = db.books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });

  const author = db.authors.find(a => a.id === book.authorId);
  if (!author) return res.status(404).json({ error: "Author not found" });

  res.json(author);
});

// POST /books → create a new book
router.post("/", (req, res) => {
  const { title, authorId, genre, price } = req.body;
  if (!title || !authorId) {
    return res.status(400).json({ error: "Title and authorId are required" });
  }

  const authorExists = db.authors.find(a => a.id === parseInt(authorId));
  if (!authorExists) return res.status(400).json({ error: "Author does not exist" });

  const newBook = { id: db.books.length + 1, title, authorId, genre, price };
  db.books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id → update a book
router.put("/:id", (req, res) => {
  const book = db.books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });

  const { title, genre, price } = req.body;
  if (title) book.title = title;
  if (genre) book.genre = genre;
  if (price) book.price = price;

  res.json(book);
});

// DELETE /books/:id → delete a book
router.delete("/:id", (req, res) => {
  const index = db.books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  db.books.splice(index, 1);
  res.json({ message: "Book deleted" });
});

module.exports = router;