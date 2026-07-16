let authors = [
  { id: 1, name: "J.K. Rowling", nationality: "British" },
  { id: 2, name: "George Orwell", nationality: "British" },
];

let books = [
  { id: 1, title: "Harry Potter", authorId: 1, genre: "Fantasy", price: 499 },
  { id: 2, title: "1984",         authorId: 2, genre: "Dystopia", price: 349 },
];

module.exports = { authors, books };