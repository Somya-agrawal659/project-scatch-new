const express = require("express");
const router = express.Router();

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
    res.render("createproduct", {success});
})

module.exports = router;
