const errorMiddleware = require("./Middlewares/error-middleware");

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDB = require("./Utils/db");

app.use(express.json()); // Middleware - This will parse the incoming request body

// Mount the Router : To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Server Side!");
});

app.get("/login", (req, res) => {
  res.status(200).send("Welcome to Login Page!");
});

app.get("/register", (req, res) => {
  res.status(200).send("Welcome to Registration Page!");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
  });
});
