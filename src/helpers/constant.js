const METHOD_TYPE = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const RESPONSE_MESSAGE = {
  OK_ADD_BOOK: "Buku berhasil ditambahkan",
  OK_GET_ALL_BOOKS: "Berhasil mendapatkan semua buku",
  OK_GET_BOOK_BY_ID: "Berhasil mendapatkan buku",
  OK_UPDATE_BOOK: "Buku berhasil diperbarui",
  ERR_ADD_BOOK: "Gagal menambahkan buku",
  ERR_UPDATE_BOOK: "Gagal memperbarui buku",
  ERR_GET_ALL_BOOKS: "Gagal mendapatkan semua buku",
  ERR_BOOK_NOT_FOUND: "Buku tidak ditemukan",
  ERR_DELETE_BOOK: "Buku gagal dihapus",
};

const ACTION_TYPE = {
  ADD: "ADD",
  UPDATE: "UPDATE",
};

module.exports = {
  METHOD_TYPE,
  RESPONSE_MESSAGE,
  ACTION_TYPE,
};
