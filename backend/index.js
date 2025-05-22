const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000 ;

// Database connection
const connectDB = require("./config/Database")
connectDB();

//  Middleware 

const cors = require("cors")
app.use(cors())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST","DELETE","PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded());

// Routes 
app.use('/',require('./routes/indexRoutes'))

app.listen(port,() =>{
    console.log(`Server is running on ${port}`);
    
})
