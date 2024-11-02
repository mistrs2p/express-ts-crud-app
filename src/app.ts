import express from "express";
import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";
import connectDB from "@/db";

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
