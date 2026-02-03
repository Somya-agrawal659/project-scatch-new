const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
    fullname :{
         type : String,
         minLength: 3,
         trim: true,
    },
    email : String ,
    password : String,
    products : {
        type : Array,
        default : [],
    },

    
    orders : {
        type : Array,
        default: [],
    },

    
    picture: String,
    gstin: String,
})

//this is for exporting the model
module.exports = mongoose.model("owner",ownerSchema)