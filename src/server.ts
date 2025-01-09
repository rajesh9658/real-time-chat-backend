import express from "express";
import connectDb from "./config/db";
import dotenv from "dotenv";
import authroutes from "./Routes/Authroutes";
dotenv.config();
connectDb();


const app =express();
app.use(express.json());
app.use("/api/auth",authroutes);

const port = process.env.PORT || 3000;

app.listen(port,()=>console.log (`Server running on port ${port}`));
