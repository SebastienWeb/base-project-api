const jwt = require("jsonwebtoken");
require("dotenv").config();
const fp = require("fastify-plugin");
const fs = require("fs");
const middleware = async (fastify) => {
  await fastify.decorate("verifTokenValid", async (request, reply, done) => {
    const bearerHeader = await request.headers.authorization;
    if (!bearerHeader) {
      const filename = `./images/${request.file.filename}`;
      fs.unlink(filename, (error) => {
        reply.status(500).send({
          error,
        });
      });
      return await reply.status(403).send({
        message: "A token is required for authentification",
      });
    }
    try {
      const bearerToken = await bearerHeader.split(" ")[1];
      const decodedToken = jwt.verify(bearerToken, process.env.SECRET_TOKEN);
      request.token = decodedToken;
      done();
    } catch (error) {
      await reply.send({
        error,
      });
    }
  });
};
module.exports = fp(middleware);
