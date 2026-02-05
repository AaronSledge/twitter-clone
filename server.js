import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/Users.js";

//load the env variable
dotenv.config();

//creates express application object
const app = express();

//tells browser to allow request from other origins
app.use(cors());


app.use(express.json());

//cloud based server so use env variable which holds connection string
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"))
.catch(err => console.log(err))


app.use("/users", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"))

