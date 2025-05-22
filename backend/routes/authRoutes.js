const express = require("express");
const { SignUp, login } = require("../controllers/UserControllers");


const routes = express.Router();

routes.post('/signup',SignUp)
routes.post('/login',login)

module.exports = routes