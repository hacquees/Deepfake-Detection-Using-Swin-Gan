const { Router } = require("express")
const User = require("../model/user")

const router = Router()
router.get("/signin", (req, res) => {
  return res.render("signin")
})
router.get("/signup", (req, res) => {
  return res.render("signup")
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password)
    return res.cookie("token", token).redirect("/user/home")
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    })
  }
})

router.post("/signup", async (req, res) => {
  const {fullName,email,password} = req.body
  console.log(req.body)
  await User.create({
    fullName,
    email,
    password,
  })
  return res.redirect("/user/home")
})

router.get("/home", (req, res) => {
    res.render("home")
})

module.exports = router;
