const Hapi = require("@hapi/hapi");
const util = require("./helpers/util");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  server.route(require("./route"));

  server.ext("onPreResponse", (req, h) => {
    const res = req.response;
    if (res instanceof Error) {
      return util.responseError(h, res.message, res.statusCode);
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
