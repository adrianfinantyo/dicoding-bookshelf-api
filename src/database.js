const { nanoid } = require("nanoid");

const bookData = [
  {
    id: "Qbax5Oy7L8WKf74l",
    name: "Buku A",
    year: 2010,
    author: "John Doe",
    summary: "Lorem ipsum dolor sit amet",
    publisher: "Dicoding Indonesia",
    pageCount: 100,
    readPage: 25,
    finished: false,
    reading: false,
    insertedAt: "2021-03-04T09:11:44.598Z",
    updatedAt: "2021-03-04T09:11:44.598Z",
  },
  {
    id: "Qbax5Oy7L8WKf74x",
    name: "Buku A",
    year: 2010,
    author: "John Doe",
    summary: "Lorem ipsum dolor sit amet",
    publisher: "Dicoding Indonesia",
    pageCount: 100,
    readPage: 100,
    finished: true,
    reading: false,
    insertedAt: "2021-03-04T09:11:44.598Z",
    updatedAt: "2021-03-04T09:11:44.598Z",
  },
];

const db = {
  books: new Map(bookData.map((book) => [book.id, book])),
};

const addBookToShelf = (newBook) => {
  const timestamp = new Date().toISOString();
  newBook.id = nanoid(16);
  newBook.insertedAt = timestamp;
  newBook.updatedAt = timestamp;
  db.books.set(newBook.id, newBook);
  return newBook.id;
};

const getBookFromShelf = (bookId) => {
  return db.books.get(bookId);
};

const updateBookOnShelf = (bookId, updatedBook) => {
  const timestamp = new Date().toISOString();
  const book = db.books.get(bookId);
  if (book === undefined) {
    throw new Error("Id tidak ditemukan");
  }
  updatedBook.id = book.id;
  updatedBook.insertedAt = book.insertedAt;
  updatedBook.updatedAt = timestamp;
  db.books.set(bookId, updatedBook);
  return updatedBook;
};

const getAllBooks = () => {
  return [...db.books.values()];
};

const deleteBookFromShelf = (bookId) => {
  const book = db.books.get(bookId);
  if (book === undefined) {
    throw new Error("Id tidak ditemukan");
  }
  db.books.delete(bookId);
};

module.exports = {
  addBookToShelf,
  getBookFromShelf,
  updateBookOnShelf,
  getAllBooks,
  deleteBookFromShelf,
};
