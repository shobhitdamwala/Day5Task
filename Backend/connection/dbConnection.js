import mongoose from "mongoose";



const dbConnection = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/BlogApplicaton"); 
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default dbConnection;