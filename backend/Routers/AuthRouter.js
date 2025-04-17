const { login, signup } = require("../Controllers/AuthController");
const { signupValidate, loginValidation } = require("../Middlewear/AuthValidation");

const Router = require("express").Router();


Router.post("/login", loginValidation, login);

Router.post("/signup", signupValidate, signup);

module.exports = Router;