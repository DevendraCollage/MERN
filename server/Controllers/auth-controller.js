//? This is our controllers to handle requests
const User = require("../Models/user-model");

// Home Logic
const home = async (req, res) => {
  try {
    console.log(req.body);
    // res.status(200).send("Welcome to Router Server Side! ");
    res.status(200).send({ message: req.body });
  } catch (error) {
    console.log(error);
  }
};

// Register Logic
const register = async (req, res) => {
  try {
    const data = req.body;
    const { username, email, phone, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Email Already Exist!" });
    }
    await User.create({ username, email, phone, password });

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, register };
