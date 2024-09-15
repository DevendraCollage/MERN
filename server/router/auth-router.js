const express = require("express");
const router = express.Router();

// You can make route like this type-1
// router.get("/", (req, res) => {
//   res.status(200).send("Welcome to Router Server Side! ");
// });

// You can make route like this type-2
router.route("/").get((req, res) => {
  res.status(200).send("Welcome to Router Server Side! ");
});

router.route("/login").get((req, res) => {
  res.status(200).send("Welcome to Router Login Page! ");
});

module.exports = router;
