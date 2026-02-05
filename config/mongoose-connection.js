const mongoose = require('mongoose')
//("development:mongoose") isme apn kuch bhi likh skte hain , yeh bus name hai
const dbgr = require("debug")("development:mongoose")

const config = require('config')

mongoose



//pehle mongoose connect krne bolega
//yeh waala sirf local server connect krne k liye hota hai
.connect(`${config.get("MONGODB_URI")}/scatch`)

//agr connect hogya then
.then(function(){
    dbgr("connected")
})

//agar connect nahi ho rha hai
.catch(function(err){
    dbgr(err);                                   
})

// to run the server and connection then we will export the model
module.exports = mongoose.connection