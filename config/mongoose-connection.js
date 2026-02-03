const mongoose = require('mongoose')

mongoose
//pehle mongoose connect krne bolega
//yeh waala sirf local server connect krne k liye hota hai
.connect("mongodb://127.0.0.1:27017/scatch")

//agr connect hogya then
.then(function(){
    console.log("connected");
})

//agar connect nahi ho rha hai
.catch(function(err){
    console.log(err);                                   
})

// to run the server and connection then we will export the model
module.exports = mongoose.connection