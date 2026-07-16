const express     = require("express");
const app         = express();
const booksRouter   = require("./routes/books");
const authorsRouter = require("./routes/authors");

app.use(express.json()); // parse JSON request bodies

// Mount routers
app.use("/books",   booksRouter);
app.use("/authors", authorsRouter);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Bookstore API 📚" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Bookstore server running at http://localhost:${PORT}`);
});