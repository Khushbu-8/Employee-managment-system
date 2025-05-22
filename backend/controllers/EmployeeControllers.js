const Employee = require("../models/EmployeeModel");

// Add Employee
const addEmployee = async (req, res) => {
  const { name, email, dateOfJoining } = req.body;
  // console.log(req.body);
  try {
    const newEmployee = await Employee.create({ name, email, dateOfJoining });
    return res.status(201).send({
      status: true,
      massage: "Employee Added Successfully",
      newEmployee,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// View Employee
const viewEmployee = async (req, res) => {
  try {
    const viewEmp = await Employee.find({});
    // console.log(viewEmp);
    return res.status(201).send({
      status: true,
      massage: "Employee View Successfully",
      viewEmp,
    });
  } catch (error) {
    return res.status(400).send({ message: err.message });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const empId = req.query.id;
    // console.log(empId, "empId");
    await Employee.findByIdAndDelete(empId);

    return res.status(201).send({
      status: true,
      massage: "Employee Delete Successfully",
    });
  } catch (error) {
    return res.status(400).send({ message: err.message });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const empId = req.query.id;

    // console.log(empId, "empId");
      const updated = await Employee.findByIdAndUpdate(empId, req.body, { new: true });
   
    return res.status(201).send({
      status: true,
      massage: "Employee Update Successfully",
      updated
    });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = {
  addEmployee,
  viewEmployee,
  deleteEmployee,
  updateEmployee
};
