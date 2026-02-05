const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  //agar user joh access kr rha hai page uske token nahi then we will redirect it to the login page
  if (!req.cookies.token) {
    //flash message create kr rhe hain yaha
    req.flash("error", "you need to login first");
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      //user ka account ka data find kiya and usme se password ka data hata diya
      .findOne({ email: decoded.email })
      .select("-password");

    //req m user ka data put kr diya hai
    req.user = user;
    next();

    //agar koi error hogi toh uske liye error chalega
  } catch (err) {
    req.flash("error", "something went wrong");
    res.redirect("/");
  }
};
