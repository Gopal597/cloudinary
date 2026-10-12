const Product = require("../models/product.model");
const cloudinary = require("../config/cloudeniry");
const fs = require("fs/promises");
class ProductController {
  async Getproduct(req, res) {
    const products = await Product.find({ isDelete: false });
    return res.render("curd/list", {
      title: "Product listing page",
      products: products,
    });
  }
  async Createproduct(req, res) {
    return res.render("curd/add", {
      title: "Product Create page",
    });
  }
  async Storeproduct(req, res) {
    console.log(req.file);
    let cloudinaryResult;
    try {
      const { name, price, description, brand } = req.body;
      if (!req.file) {
        return res.status(400).send("Please select an image");
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      const productitems = new Product({
        name,
        price,
        description,
        brand,
        image: result.secure_url,
      });

      const data = await productitems.save();
      if (data) {
        return res.redirect("/products");
      } else {
        return res.redirect("/create/products");
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (req.file?.path) {
        await fs.unlink(req.file.path).catch(() => {});
      }
    }
  }
  async Editproduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      if (!product) {
        return res.redirect("/products");
      }
      res.render("curd/edit", {
        title: "Edit page",
        product: product,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async Updateproduct(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.redirect("/products");
      }
      const { name, price, description, brand } = req.body;
      const updatedata = await Product.findByIdAndUpdate(
        id,
        { name, price, description, brand },
        { new: true },
      );
      return res.redirect("/products");
    } catch (error) {
      console.log(error);
    }
  }
  async Deleteproduct(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.redirect("/products");
      }
      const deldata = await Product.findByIdAndDelete(id);
      return res.redirect("/products");
    } catch (error) {
      console.log(error);
    }
  }
  async softDeleteproduct(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.redirect("/products");
      }
      const sofdel = await Product.findByIdAndUpdate(
        id,
        { isDelete: true },
        { new: true },
      );
      return res.redirect("/products");
    } catch (error) {
      console.log(error);
    }
  }
  async Viewproduct(req, res) {
    try {
      const id=req.params.id;
      const vproduct=await Product.findById(id);
      if(!vproduct){
        return res.redirect("/products")
      }
      res.render("curd/view",{
        title:vproduct.name,
        vproduct:vproduct,
      })
    } catch (error) {
      console.log(error);
      res.redirect("/products")
    }
  }
  
async SoftDeleteProduct(req, res) {
  try {
    const id = req.params.id;
   
    await Product.findByIdAndUpdate(id, { isDeleted: true });
    return res.redirect("/products");
  } catch (error) {
    console.log(error);
  }
}

// 2. View the Recycle Bin Page
// 1. Fetch and render only the soft-deleted records
async GetRecycleBin(req, res) {
  try {
    const deletedProducts = await Product.find({ isDelete: true });
    res.render("curd/recycle-bin", { // This will be your new recycle bin template
      title: "Recycle Bin",
      products: deletedProducts,
    });
  } catch (error) {
    console.log(error);
  }
}

// 2. Restore an item back to the main list
async Restoreproduct(req, res) {
  try {
    const id = req.params.id;
    await Product.findByIdAndUpdate(id, { isDelete: false });
    return res.redirect("/products/recycle-bin");
  } catch (error) {
    console.log(error);
  }
}


}

module.exports = new ProductController();
