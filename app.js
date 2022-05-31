const fastify = require("fastify")({
  logger: true,
});
const helmet = require("@fastify/helmet");
require("dotenv").config();

const prisma = require("./server");
const cors = require("@fastify/cors");
const compress = require("@fastify/compress");
const route = require("./routes/index");
const multer = require("fastify-multer");
const auth = require("./middleware/auth");

const start = async () => {
  try {
    await fastify.register(cors);
    await fastify.register(helmet);
    await fastify.register(compress, {
      encodings: ["gzip"],
    });
    await fastify.register(require("@fastify/rate-limit"), {
      max: process.env.MAX,
      timeWindow: process.env.TIME_WINDOWS,
      allowList: [process.env.ADRESS_IP],
    });
    await fastify.register(auth);
    await fastify.register(multer.contentParser);
    await fastify.register(route, { prefix: "/api" });

    await fastify.listen(3000);
  } catch (error) {
    fastify.log.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
start();
