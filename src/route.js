const controller = require("./controller");
const constant = require("./helpers/constant");
const middleware = require("./middleware");

module.exports = [
  {
    method: constant.METHOD_TYPE.GET,
    path: "/",
    handler: controller.homepage,
  },
  {
    method: constant.METHOD_TYPE.POST,
    path: "/books",
    handler: controller.addBook,
    options: {
      pre: [
        middleware.isFinishedReading,
        {
          method: middleware.validateReadPage(constant.ACTION_TYPE.ADD),
          assign: "validateReadPage",
        },
        {
          method: middleware.requiredField({
            fieldName: "name",
            translateFieldName: "nama",
            actionType: constant.ACTION_TYPE.ADD,
          }),
          assign: "validateNameField",
        },
      ],
    },
  },
  {
    method: constant.METHOD_TYPE.GET,
    path: "/books",
    handler: controller.getAllBooks,
  },
  {
    method: constant.METHOD_TYPE.GET,
    path: "/books/{bookId}",
    handler: controller.getBookById,
  },
  {
    method: constant.METHOD_TYPE.PUT,
    path: "/books/{bookId}",
    handler: controller.editBookById,
    options: {
      pre: [
        middleware.isFinishedReading,
        {
          method: middleware.validateReadPage(constant.ACTION_TYPE.UPDATE),
          assign: "validateReadPage",
        },
        {
          method: middleware.requiredField({
            fieldName: "name",
            translateFieldName: "nama",
            actionType: constant.ACTION_TYPE.UPDATE,
          }),
          assign: "validateNameField",
        },
      ],
    },
  },
  {
    method: constant.METHOD_TYPE.DELETE,
    path: "/books/{bookId}",
    handler: controller.deleteBookById,
  },
];
