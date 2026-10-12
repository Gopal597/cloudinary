const express = require("express");
const productcontroller = require("../controller/product.controller");
const upload = require('../utils/multer')

const Route = express.Router();

Route.get("/products", productcontroller.Getproduct);
Route.get("/create/products", productcontroller.Createproduct);
Route.get("/products/recycle-bin", productcontroller.GetRecycleBin);
Route.post("/store/products", upload.single("image"), productcontroller.Storeproduct);
Route.get("/edit/products/:id", productcontroller.Editproduct);
Route.post("/update/products/:id", productcontroller.Updateproduct);
Route.get("/delete/products/:id", productcontroller.Deleteproduct);
Route.get("/softdelete/products/:id", productcontroller.softDeleteproduct);
Route.get("/view/products/:id", productcontroller.Viewproduct);
Route.get("/products/recycle-bin", productcontroller.GetRecycleBin);
Route.get("/restore/products/:id", productcontroller.Restoreproduct);




module.exports = Route;
