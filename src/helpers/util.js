const getStatusByCode = (code) => {
  if (code >= 400 && code < 600) return "fail";
  return "success";
};

const responseJSON = (h, data, code) => {
  const { message, ...rest } = data;
  const isDataEmpty = Object.keys(rest).length === 0;
  const res = h.response({
    status: getStatusByCode(code),
    message,
    data: rest,
  });
  if (isDataEmpty) delete res.data;
  res.code(code);
  res.type("application/json");
  return res;
};

const responseError = (h, message, code = 500) => {
  const res = h.response({
    status: getStatusByCode(code),
    message,
  });
  res.code(code);
  res.type("application/json");
  return res;
};

const createErrorInstance = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

module.exports = {
  getStatusByCode,
  responseJSON,
  responseError,
  createErrorInstance,
};
