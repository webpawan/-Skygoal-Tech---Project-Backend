import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import "./DB/connection.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

app.use(cookieParser());
app.use(express.json())

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log("server start", PORT);
});
