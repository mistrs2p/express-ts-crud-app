import express from "express";
import authRoutes from "@/routes/authRoutes";
import userRoutes from "@/routes/userRoutes";
import connectDB, { dbStatus } from "@/db";
import logger from "@/utils/logger";

const app = express();

const dbConf = async () => {
  let tryCon = 3
  try {
    const dbState = await connectDB()
    logger.info(`Database Connection State: ${dbStatus[dbState]}`)
  } catch (err: any) {
    logger.error("Database Connection Error: ", err);
    if (tryCon > 0) {
      tryCon --
      dbConf()
    } else {
      logger.error("Failed to connect to the database after multiple attempts. Exiting...")
      process.exit(1)
    }
  }
};

dbConf();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
