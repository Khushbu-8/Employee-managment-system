const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SignUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // console.log(req.body, "data");

    if (!username || !email || !password) {
      return res.status(400).send({
        status: false,
        massage: "All fields are required",
      });
    }

    //Privent Duplucates
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        status: false,
        massage: "Email Already registered",
      });
    }

    // password hashing
    const hashPassword = await bcrypt.hash(password, 10);

    // create User
    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
      role,
    });

    // generate token

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).send({
      success: true,
      massage: "SignUp Success",
      user,
      token,
    });

  } catch (error) {
    return res.status(400).send({
      success: false,
      massage: error,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);

    const user = await UserModel.findOne({ email });
    // console.log(user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const Users = {
       username: user.username,
    email: user.email,
    role: user.role
    }

    // generate token

    const token = jwt.sign({ 
      id: user._id,
      username: user.username,
    email: user.email,
    role: user.role
     }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("refreshToken", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
    });
    return res.status(201).send({
      status: true,
      message: "Login successful",
      token,
      Users
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      massage: error,
    });
  }
};
const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).send({
    status: true,
    message: "User logged out successfully",
  });
};
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, "name email role"); // return selected fields
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Server error" });
  }
};
const employeeProfile =  async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    console.log(user,"users");
    
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
};
module.exports = {
  SignUp,
  login,
  logout,
  getAllUsers,
  employeeProfile
};
