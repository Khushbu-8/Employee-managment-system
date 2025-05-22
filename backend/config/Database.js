const mongoose = require("mongoose")
require("dotenv").config();

const connectDB = async() =>{
    try {
        const cnnct = mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB database conected`);
    } catch (error) {
        console.log(error);
        return false
        
    }
}
module.exports = connectDB