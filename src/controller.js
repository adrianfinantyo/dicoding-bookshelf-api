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
  // prepare query to filter books
  const reqQery = req.query;
  reqQery.name = reqQery.name || null;
  reqQery.reading = [0, 1].includes(parseInt(reqQery.reading, 10))
    ? parseInt(reqQery.reading, 10)
    : null;
  reqQery.finished = [0, 1].includes(parseInt(reqQery.finished, 10))
    ? parseInt(reqQery.finished, 10)
    : null;

  // filter the books
  let books = db.getAllBooks();
  books = books.filter(
    (book) =>
      (!reqQery.name ||
        book.name.toLowerCase().includes(reqQery.name.toLowerCase())) &&
      (reqQery.reading === null || book.reading === Boolean(reqQery.reading)) &&
      (reqQery.finished === null ||
        book.finished === Boolean(reqQery.finished)),
  );

  // prepare response
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
  const { bookId } = req.params;
  const book = db.getBookFromShelf(bookId);
  if (book === undefined) {
    return util.createErrorInstance(
      contant.RESPONSE_MESSAGE.ERR_BOOK_NOT_FOUND,
      404,
    );
  }
  const data = {
    message: contant.RESPONSE_MESSAGE.OK_GET_BOOK_BY_ID,
    book,
  };
  return util.responseJSON(h, data, 200);
};

const editBookById = (req, h) => {
  try {
    const { bookId } = req.params;
    const newBookData = req.payload;
    const updatedBook = db.updateBookOnShelf(bookId, newBookData);
    const data = {
      message: contant.RESPONSE_MESSAGE.OK_UPDATE_BOOK,
      book: updatedBook,
    };
    return util.responseJSON(h, data, 200);
  } catch (error) {
    return util.createErrorInstance(
      `${contant.RESPONSE_MESSAGE.ERR_UPDATE_BOOK}. ${error.message}`,
      404,
    );
  }
};

const deleteBookById = (req, h) => {
  try {
    const { bookId } = req.params;
    db.deleteBookFromShelf(bookId);
    const data = {
      message: "Buku berhasil dihapus",
    };
    return util.responseJSON(h, data, 200);
  } catch (error) {
    return util.createErrorInstance(
      `${contant.RESPONSE_MESSAGE.ERR_DELETE_BOOK}. ${error.message}`,
      404,
    );
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
