import express from "express";
import { authRoutes } from "./routes";
import cors from "cors";
import dishRoutes from "./routes/dish.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/dish", dishRoutes);

export default app;
