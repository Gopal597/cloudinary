
const path = require("path");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];

    if (!isValid) {
      return cb(new Error("Invalid image type"));
    }

    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const extension = FILE_TYPE_MAP[file.mimetype];
    const uniqueName = Date.now() + "-" +
      Math.round(Math.random() * 1e9);

    cb(null, `${uniqueName}.${extension}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    if (FILE_TYPE_MAP[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error("Only PNG, JPG, JPEG, GIF, and WEBP images are allowed"));
    }
  },
});

module.exports = upload;
