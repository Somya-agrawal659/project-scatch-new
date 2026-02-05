const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin")
const productModel = require("../models/product-model");
const userModel = require("../models/user-model")

router.get('/',function(req,res){
    let error = req.flash("error");
    res.render("index",{error,loggedin: false});
})

router.get('/shop',isLoggedin,async function(req,res){
    //finding the products
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", {products,success});
})

router.get('/cart',isLoggedin,async function(req,res){
    let user = await userModel
    .findOne({email:req.user.email})
    .populate("cart")
    res.render("cart",{user});
})

router.get("/addtocart/:productid",isLoggedin,async function (req,res){
    let user = await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop")
});

router.get("/removefromcart/:productid",isLoggedin,async function (req,res){
    let user = await userModel.findOne({email:req.user.email});
    user.cart = user.cart.filter(item => item._id.toString() !== req.params.productid);
    await user.save();
    res.redirect("/cart")
});

module.exports = router; 