const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

//now we will require from models to route
const ownerModel = require("../models/owner-model");

router.get("/", function (req, res) {
  res.send("hey its working");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    //pehle owner find karega
    let owners = await ownerModel.find();
    //if owner one se jada hai then new owner nahi create hone dega
    if (owners.length > 0) {
      return res
        .status(504)
        .send("You dont have permission to create a new owner.");
    }

    //email , password wagera aayega body se
    let {fullname,email,password} = req.body;

    //creating the owner
    await ownerModel.create({
      fullname,
      email,
      password,
    });

    //otherwise new owner bana skte hain
    res.status(201).send(createdOwner);
  });
}

router.get("/admin",function(req,res){
    let success = req.flash("success")
  res.render("createproduct", {success, product: null});
})

router.get("/admin/products", async function(req, res) {
  const products = await productModel.find().sort({ _id: -1 });
  res.render("admin", { products });
});

router.get("/admin/edit/:id", async function(req, res) {
  const product = await productModel.findById(req.params.id);
  if (!product) return res.status(404).send("Product not found");

  const success = req.flash("success");
  res.render("createproduct", { success, product });
});

router.post("/admin/edit/:id", upload.single("image"), async function(req, res) {
  const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
  const updates = { name, price, discount, bgcolor, panelcolor, textcolor };

  if (req.file) updates.image = req.file.buffer;

  const product = await productModel.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!product) return res.status(404).send("Product not found");

  req.flash("success", "Product updated successfully");
  res.redirect("/owners/admin/products");
});

router.post("/admin/delete/:id", async function(req, res) {
  await productModel.findByIdAndDelete(req.params.id);
  req.flash("success", "Product deleted successfully");
  res.redirect("/owners/admin/products");
});

module.exports = router;
