const multer = require("fastify-multer");
const { v4: uuidv4 } = require("uuid");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "images");
  },
  filename: (request, file, callback) => {
    const name = file.originalname.replace(/ /g, "_");
    const normalizeName = name.replace(/[^\w]/gi, "");
    const extension = MIME_TYPES[file.mimetype];
    if (extension !== "jpeg" || extension !== "jpg" || extension !== "png") {
      throw { statusCode: 418, message: "Invalid Message" };
    }
    const normalizeFile = normalizeName.replace(extension, "_");
    callback(null, normalizeFile + uuidv4() + "." + extension);
  },
});

module.exports = multer({
  storage: storage,
}).single("file");
