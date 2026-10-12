require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", "./src/view");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productRoute = require("./src/router/product.route");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(productRoute);
const dbconnection = require("./src/config/dbcon");
dbconnection();
const userroute=require("./src/router/user.router")
app.use(userroute)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
