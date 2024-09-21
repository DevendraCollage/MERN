//? This is our controllers to handle requests
const User = require("../Models/user-model");
const bcrypt = require("bcryptjs");

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
    console.log(data);
    const { username, email, phone, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: "Email Already Exist!" });
    }

    // has the password
    const saltRound = 10; // saltRound complexity of password conversion in to hash
    const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hash_password,
    });

    res.status(200).json({ data, tokens: await userCreated.generateToken() });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, register };
