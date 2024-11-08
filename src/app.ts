import express from "express";
import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";
import productRoute from "@/routes/productRoute";
import connectDB from "@/db";
import dbConnectionMiddleware from "./middlewares/dbConnectionMiddleware";
import jsonMiddleware from "./middlewares/jsonMiddleware";
import { responseServiceMiddleware } from "@/middlewares/responseServiceMiddleware";



const app = express();

connectDB();

// parse incomming request to json
app.use(express.json());

// check the connectivity of the Database
app.use(dbConnectionMiddleware);

// parse response to json
app.use(jsonMiddleware);

// app.use(responseService)

app.use(responseServiceMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoute);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
