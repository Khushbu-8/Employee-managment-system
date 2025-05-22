const express = require("express");
const { addEmployee, viewEmployee, deleteEmployee, updateEmployee, getEmployeeById } = require("../controllers/EmployeeControllers");
const { isAdmin, verifyToken } = require("../middleware/Auth");

const routes = express.Router();

routes.post('/addEmployee',verifyToken,isAdmin,addEmployee)
routes.get('/viewEmployee',verifyToken,isAdmin,viewEmployee)
routes.delete('/deleteEmployee/:id',verifyToken,isAdmin,deleteEmployee)
routes.put('/updateEmployee/:id',verifyToken,isAdmin,updateEmployee)
routes.get('/getEmployeeById/:id',verifyToken,isAdmin,getEmployeeById)

module.exports = routes