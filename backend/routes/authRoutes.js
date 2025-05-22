const express = require("express");
const { SignUp, login, logout, employeeProfile, getAllUsers } = require("../controllers/UserControllers");
const { verifyToken } = require("../middleware/Auth");


const routes = express.Router();

routes.post('/signup',SignUp)
routes.post('/login',login)
routes.post('/logout',logout)
routes.get('/getAllUsers',verifyToken,getAllUsers)
routes.get('/employeeProfile',verifyToken,employeeProfile)

module.exports = routes