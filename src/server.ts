import { Request, Response } from "express";
import connectDB from "./config/db";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
