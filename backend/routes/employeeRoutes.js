const express = require("express");
const { addEmployee, viewEmployee, deleteEmployee, updateEmployee } = require("../controllers/EmployeeControllers");

const routes = express.Router();

routes.post('/addEmployee',addEmployee)
routes.get('/viewEmployee',viewEmployee)
routes.delete('/deleteEmployee',deleteEmployee)
routes.put('/updateEmployee',updateEmployee)

module.exports = routes