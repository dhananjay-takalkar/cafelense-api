import express from "express";
import { authRoutes } from "./routes";
import cors from "cors";
import dishRoutes from "./routes/dish.routes";
import cafeRoutes from "./routes/cafe.route";
import compression from "compression";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use("/api/auth", authRoutes);
app.use("/api/dish", dishRoutes);
app.use("/api/cafe", cafeRoutes);

export default app;
