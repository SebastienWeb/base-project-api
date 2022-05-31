const homeCtrl = require("../../controller/home");
async function routes(fastify) {
  fastify.get("/", homeCtrl.home);
}

module.exports = routes;
