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
    console.log("Request body:", data); // log to see incoming data
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ msg: "All fields are required!" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Email Already Exist!" });
    }

    const hash_password = await bcrypt.hash(password, 10);
    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hash_password,
    });

    console.log("User created:", userCreated);
    return res
      .status(200)
      .json({ data, tokens: await userCreated.generateToken() });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Login Logic
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    const isPasswordMatch = await userExist.comparePassword(password);

    if (isPasswordMatch) {
      const token = await userExist.generateToken();
      res.status(200).json({
        msg: "Login Successful",
        token: token,
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password!" });
    }
  } catch (error) {
    // res.status(500).json("Internal Server Error!");
    next(error);
  }
};

module.exports = { home, register, login };
