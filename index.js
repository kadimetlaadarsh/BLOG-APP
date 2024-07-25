import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";



// env config
dotenv.config();

mongoose.connect(process.env.URL, {
})
.then(() => {
    console.log("Connected successfully to MongoDB".green);
})
.catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// port
const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE || 'development';

// listen
app.listen(PORT, () => {
    console.log(`Server is running in ${DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
