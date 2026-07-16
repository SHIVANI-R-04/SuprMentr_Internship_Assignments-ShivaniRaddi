const express = require("express");
const router  = express.Router();
const db      = require("../data/db");

// GET /authors → list all authors
router.get("/", (req, res) => {
  res.json(db.authors);
});

// GET /authors/:id → get one author
router.get("/:id", (req, res) => {
  const author = db.authors.find(a => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ error: "Author not found" });
  res.json(author);
});

// POST /authors → create a new author
router.post("/", (req, res) => {
  const { name, nationality } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const newAuthor = { id: db.authors.length + 1, name, nationality };
  db.authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// PUT /authors/:id → update an author
router.put("/:id", (req, res) => {
  const author = db.authors.find(a => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ error: "Author not found" });

  const { name, nationality } = req.body;
  if (name)        author.name        = name;
  if (nationality) author.nationality = nationality;

  res.json(author);
});

// DELETE /authors/:id → delete an author
router.delete("/:id", (req, res) => {
  const index = db.authors.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Author not found" });

  db.authors.splice(index, 1);
  res.json({ message: "Author deleted" });
});

module.exports = router;