const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000 ;

// Database connection
const connectDB = require("./config/Database")
connectDB();

//  Middleware 
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true })); // Change `true` or `false` as needed
app.use(bodyParser.json());

const cors = require("cors");
const corsOptions = {
  origin: ["employee-managment-system-6id7.vercel.app","http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"], // Add methods as needed
  credentials: true, // If your frontend sends cookies
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello");
});
// Routes 
app.use('/',require('./routes/indexRoutes'))

app.listen(port,() =>{
    console.log(`Server is running on ${port}`);
    
})
