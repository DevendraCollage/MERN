const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//? secure password with the bcrypt
userSchema.pre("save", async function (next) {
  console.log(this);
  const user = this; // because we will store data in this

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

// Compare the password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Implementation of JSON web Tokens
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "5d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// ** What is JWT? **

// - JSON web Tokens (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
// - JWTs are often used for authentication and authorization in web application.
// 1. **Authentication:** Verifying the identity of a user or client.
// 2. **Authorization:** Determining what actions a user or client is allowed to perform.

// ** Components of a JWT: **

// - Header: Container metadata about the token, such as the type of token and the signing algorithm being used.
// -  Payload: Contains claims or statements about an entity (typically, the user) and additional data. Common claims include user ID, username, and expiration time.
// Signature: To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way, a signature is included.

//! Note: such as JWTs (JSON web tokens), are typically not stored in the database along with other user details. Instead, they are the server during the authentication process and the stored on the client-side (e.g., in cookies or local storage) for later use.

// Define the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;
