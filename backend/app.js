import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/config.js";

dotenv.config();
connectDB();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "internal server error" });
});

export default app;
