import express from "express";
import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";
import productRoute from "@/routes/productRoute";
import connectDB, { dbStatus } from "@/db";
import dbConnectionMiddleware from "./middlewares/dbConnectionMiddleware";
import jsonMiddleware from "./middlewares/jsonMiddleware";

const app = express();

connectDB();

// parse incomming request to json
app.use(express.json());

app.use(dbConnectionMiddleware);

app.use(jsonMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoute);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
