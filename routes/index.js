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
    const discountedOnly = req.query.discounted === "true";
    const availability = req.query.availability === "available" ? "available" : "all";
    const collection = req.query.collection === "new" ? "new" : "all";
    const sortby = req.query.sortby || "popular";
    const filter = {};
    if (discountedOnly) filter.discount = { $gt: 0 };
    if (availability === "available") filter.available = { $ne: false };
    const sort = {
        popular: { _id: -1 },
        newest: { _id: -1 },
        "price-low": { price: 1 },
        "price-high": { price: -1 },
    }[sortby] || { _id: -1 };
    let query = productModel.find(filter).sort(collection === "new" ? { _id: -1 } : sort);
    if (collection === "new") query = query.limit(8);
    let products = await query;
    let success = req.flash("success");
    res.render("shop", {products,success,sortby,discountedOnly,availability,collection});
})

router.get('/cart',isLoggedin,async function(req,res){
    let user = await userModel
    .findOne({email:req.user.email})
    .populate("cart")
    res.render("cart",{user});
})

router.get('/account', isLoggedin, async function(req, res) {
    const user = await userModel.findById(req.user._id).select("-password");
    res.render("account", { user });
});

router.get('/orders', isLoggedin, async function(req, res) {
    const user = await userModel.findById(req.user._id).select("orders");
    res.render("orders", { orders: user.orders || [] });
});

router.post('/orders/place', isLoggedin, async function(req, res) {
    const user = await userModel.findById(req.user._id).populate("cart");
    if (!user || user.cart.length === 0) return res.redirect("/orders");

    const items = user.cart.map(function(item) {
        const price = Number(item.price) || 0;
        const discount = Number(item.discount) || 0;
        return {
            name: item.name,
            price,
            discount,
            total: Math.max(0, price - discount) + 20,
        };
    });

    user.orders.unshift({
        orderId: `ORD-${Date.now()}`,
        placedAt: new Date(),
        items,
        total: items.reduce((sum, item) => sum + item.total, 0),
        status: "Placed",
    });
    user.cart = [];
    await user.save();
    res.redirect("/orders");
});

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