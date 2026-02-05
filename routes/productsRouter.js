const express = require("express")
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model")

router.post("/create",upload.single("image"),async function(req,res){   
    try{
    
    let{name,price,discount,bgcolor,panelcolor,textcolor} = req.body;
        //creating the product 
    let product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
    })

    //then we are sending back the product with created product flash and yeh waala hum ownersRouter waale page pr laga dunga
    req.flash("success","Product created successfully")
    res.redirect("/owners/admin")
    res.redirect(product);
    } catch(err){
        res.send(err.message)
    }
})

module.exports = router;