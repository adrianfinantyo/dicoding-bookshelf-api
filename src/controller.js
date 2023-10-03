const util = require("./helpers/util");
const db = require("./database");
const contant = require("./helpers/constant");

const homepage = (req, h) => {
  const data = {
    message: "Homepage",
  };
  return util.responseJSON(h, data, 200);
};

const addBook = (req, h) => {
  const newBook = req.payload;
  const newBookId = db.addBookToShelf(newBook);
  const data = {
    message: contant.RESPONSE_MESSAGE.OK_ADD_BOOK,
    bookId: newBookId,
  };
  return util.responseJSON(h, data, 201);
};

const getAllBooks = (req, h) => {
  const books = db.getAllBooks();
  const booksData = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  const data = {
    message: contant.RESPONSE_MESSAGE.OK_GET_ALL_BOOKS,
    books: booksData,
  };
  return util.responseJSON(h, data, 200);
};

const getBookById = (req, h) => {
  const bookId = req.params.bookId;
  const book = db.getBookFromShelf(bookId);
  if (book === undefined) {
    return util.createErrorInstance(contant.RESPONSE_MESSAGE.ERR_BOOK_NOT_FOUND, 404);
  }
  const data = {
    message: contant.RESPONSE_MESSAGE.OK_GET_BOOK_BY_ID,
    book,
  };
  return util.responseJSON(h, data, 200);
};

const editBookById = (req, h) => {
  try {
    const bookId = req.params.bookId;
    const newBookData = req.payload;
    const updatedBook = db.updateBookOnShelf(bookId, newBookData);
    const data = {
      message: contant.RESPONSE_MESSAGE.OK_UPDATE_BOOK,
      book: updatedBook,
    };
    return util.responseJSON(h, data, 200);
  } catch (error) {
    return util.createErrorInstance(`${contant.RESPONSE_MESSAGE.ERR_UPDATE_BOOK}. ${error.message}`, 404);
  }
};

const deleteBookById = (req, h) => {
  try {
    const bookId = req.params.bookId;
    db.deleteBookFromShelf(bookId);
    const data = {
      message: "Buku berhasil dihapus",
    };
    return util.responseJSON(h, data, 200);
  } catch (error) {
    return util.createErrorInstance(`${contant.RESPONSE_MESSAGE.ERR_DELETE_BOOK}. ${error.message}`, 404);
  }
};

module.exports = {
  homepage,
  addBook,
  getAllBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
