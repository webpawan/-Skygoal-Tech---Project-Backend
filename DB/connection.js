import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DataBase connected");
  })
  .catch(() => {
    console.log("Data Base Not Connected");
  });
