const express = require("express");
const Route = express.Router();
const upload = require("../utils/multer2");
const usercontroller = require("../controller/user.controller");
Route.post("/user", upload.single("image"), usercontroller.createuser);
module.exports = Route;
