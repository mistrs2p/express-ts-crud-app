import express from "express";
import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";
import connectDB, { dbStatus } from "@/db";
import logger from "@/utils/logger";
import dbConnectionMiddleware from "./middlewares/dbConnectionMiddleware";

const app = express();

const dbConf = async () => {
  try {
    const dbState = await connectDB();
    logger.info(`Database Connection State: ${dbStatus[dbState]}`);
  } catch (err: any) {
    logger.error("Database Connection Error: ", err);
  }
};

dbConf();

app.use(dbConnectionMiddleware);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
