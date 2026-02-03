const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection")
const ownersRouter = require("./routes/ownersRouter") 
const productsRouter = require("./routes/productsRouter") 
const usersRouter = require("./routes/usersRouter") 

//express.json() is a built-in middleware function in the Express.js framework used for parsing incoming network requests with JSON (JavaScript Object Notation) payloads
app.use(express.json());

//Express.js middleware that parses incoming URL-encoded form data (like from HTML forms) into a readable JavaScript object,
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//ejs ka view engine setup kiya
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.send("hello");
});

app.use("/owners",ownersRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);

app.listen(3000);
