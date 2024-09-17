const express = require("express");
const router = express.Router();
const { home, register } = require("../Controllers/auth-controller");

// You can make route like this type-1
// router.get("/", (req, res) => {
//   res.status(200).send("Welcome to Router Server Side! ");
// });

// You can make route like this type-2
router.route("/").get(home);

router.route("/login").post(register);

module.exports = router;
