const homeRoute = require("./home/index");
async function routes(fastify) {
  await fastify.register(homeRoute);
}

module.exports = routes;
