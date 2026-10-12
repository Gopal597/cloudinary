const multer = require("multer");
const path = require("path");
const fs = require("fs");

const FILE_MIME_TYPE = {
  "image/jpg": "jpg",
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const inValid = FILE_MIME_TYPE[file.mimetype];
    let Uploaderror = new Error("invalid image type");
    if (inValid) {
      Uploaderror = null;
    }
    cb(Uploaderror, "uploads");
  },

  filename: function (req, file, cb) {
    const filename = file.originalname.split(" ").join("-");
    const extention = FILE_MIME_TYPE[file.mimetype];
    cb(null, `${filename}- ${Date.now()}.${extention}`);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;