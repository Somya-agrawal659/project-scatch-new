
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    image : String,
    name : String ,
    price : String,
    discount : {
        type : Array,
        default : 0,
    },

    bgcolor: String,
    panelcolor: String,
    textcolor: String,
})

//this is for exporting the model
module.exports = mongoose.model("product",productSchema)