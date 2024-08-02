import express from "express";
import mongoose from "mongoose";
import { dbConnection } from "./config/db.js";

const app = express()


dbConnection();


app.use(express.json());


const port = process.env.PORT || 9875

app.listen(port, () => {
 console.log(`App is working ${port} port`)
})
