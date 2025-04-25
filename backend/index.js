const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");

const { checkForAuthenticationCookie } = require("./middleware/authentication");

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect("mongodb://127.0.0.1:27017/deepfake")
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve('./view'));


app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(cookieParser()); 
app.use(checkForAuthenticationCookie("token")); 
app.use(express.static(path.resolve('./public'))); 

// Routes
app.get('/', async (req, res) => {
    res.render("signin");
});

app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}!`);
});
