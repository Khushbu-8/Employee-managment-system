const express = require("express");

const routes = express.Router();

routes.use("/auth",require("../routes/authRoutes"))
routes.use("/employee",require("../routes/employeeRoutes"))

module.exports = routes;