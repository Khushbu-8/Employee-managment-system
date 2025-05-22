const Employee = require("../models/EmployeeModel");

// Add Employee
const addEmployee = async (req, res) => {
  const { name, email, phone, dateOfJoining } = req.body;
  // console.log(req.body);
  if ((!name, !email, !phone, !dateOfJoining)) {
    return res.status(400).send({
      status: false,
      massage: "All fields are required",
    });
  }
  //Privent Duplucates
  const existingemployee = await Employee.findOne({ email });
  if (existingemployee) {
    return res.status(401).send({
      status: false,
      massage: "Email Already registered",
    });
  }
  try {
    const newEmployee = await Employee.create({
      name,
      email,
      phone,
      dateOfJoining,
    });
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
    return res.status(400).send({ message: error.message });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const empId = req.params.id;
    // console.log(empId, "empId");
    await Employee.findByIdAndDelete(empId);

    return res.status(201).send({
      status: true,
      massage: "Employee Delete Successfully",
    });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

//  get singleEmploye for edit
const getEmployeeById = async (req, res) => {
  try {
    const empId = req.params.id;
// console.log(empId,"idd");

    if (!empId) {
      return res.status(400).send({ success: false, message: "Employee ID is required" });
    }

    const employee = await Employee.findById(empId);

    if (!employee) {
      return res.status(404).send({ success: false, message: "Employee not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Employee fetched successfully",
      employee,
    });
  } catch (err) {
    console.error("Error fetching employee:", err);
    return res.status(500).send({ success: false, message: err.message });
  }
};
// Update Employee
const updateEmployee = async (req, res) => {
  try {
    const empId = req.params.id;
console.log(empId,"idd");

    if (!empId) {
      return res.status(400).send({ success: false, message: "Employee ID is required" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(empId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).send({ success: false, message: "Employee not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (err) {
    console.error("Error updating employee:", err);
    return res.status(500).send({ success: false, message: err.message });
  }
};


module.exports = {
  addEmployee,
  viewEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployeeById
};
