const express = require("express");
const router = express.Router();
const { home, register, login } = require("../Controllers/auth-controller");
const validate = require("../Middlewares/validate-middleware");
const signupSchema = require("../Validators/auth-validator");

// You can make route like this type-1
// router.get("/", (req, res) => {
//   res.status(200).send("Welcome to Router Server Side! ");
// });

// You can make route like this type-2
router.route("/").get(home);
router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(login);

module.exports = router;
