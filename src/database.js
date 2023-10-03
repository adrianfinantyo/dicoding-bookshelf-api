const { nanoid } = require("nanoid");

const bookDataDummy = [
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
  books:
    process.env.SEED_DATA === "true"
      ? new Map(bookDataDummy.map((book) => [book.id, book]))
      : new Map(),
};

const addBookToShelf = (book) => {
  const newBook = { ...book };
  const timestamp = new Date().toISOString();
  newBook.id = nanoid(16);
  newBook.insertedAt = timestamp;
  newBook.updatedAt = timestamp;
  db.books.set(newBook.id, newBook);
  return newBook.id;
};

const getBookFromShelf = (bookId) => db.books.get(bookId);

const updateBookOnShelf = (bookId, bookData) => {
  const timestamp = new Date().toISOString();
  const existingBook = db.books.get(bookId);
  if (existingBook === undefined) {
    throw new Error("Id tidak ditemukan");
  }
  const updatedBook = { ...existingBook, ...bookData };
  updatedBook.updatedAt = timestamp;
  db.books.set(bookId, updatedBook);
  return updatedBook;
};

const getAllBooks = () => [...db.books.values()];

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
