//? This is our controllers to handle requests

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
    res.status(200).send("Welcome to Router Login Page! ");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, register };
