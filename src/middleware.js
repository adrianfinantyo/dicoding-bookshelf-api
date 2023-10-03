const util = require("./helpers/util");
const contant = require("./helpers/constant");

const isFinishedReading = (req, h) => {
  const { pageCount, readPage } = req.payload;
  if (pageCount === readPage) {
    req.payload.finished = true;
  } else {
    req.payload.finished = false;
  }
  return h.continue;
};

const validateReadPage = (actionType) => {
  return (req, h) => {
    let msgHeader = contant.RESPONSE_MESSAGE.ERR_ADD_BOOK;
    if (actionType === contant.ACTION_TYPE.UPDATE) {
      msgHeader = contant.RESPONSE_MESSAGE.ERR_UPDATE_BOOK;
    }
    const { readPage, pageCount } = req.payload;
    if (readPage > pageCount) {
      return util.createErrorInstance(`${msgHeader}. readPage tidak boleh lebih besar dari pageCount`, 400);
    }
    return h.continue;
  };
};

const requiredField = (options) => {
  return (req, h) => {
    const { fieldName, translateFieldName, actionType } = options;
    let msgHeader = contant.RESPONSE_MESSAGE.ERR_ADD_BOOK;
    if (actionType === contant.ACTION_TYPE.UPDATE) {
      msgHeader = contant.RESPONSE_MESSAGE.ERR_UPDATE_BOOK;
    }
    if (!req.payload[fieldName]) {
      return util.createErrorInstance(`${msgHeader}. Mohon isi ${translateFieldName} buku`, 400);
    }
    return h.continue;
  };
};

module.exports = {
  isFinishedReading,
  validateReadPage,
  requiredField,
};
