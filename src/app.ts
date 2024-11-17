import express from "express";
import connectDB from "@/db";
import dbConnectionMiddleware from "./middlewares/dbConnectionMiddleware";
import jsonMiddleware from "./middlewares/jsonMiddleware";
import userRoute from "./controllers/User";
import authRoute from "./controllers/User/Auth";
import productRoute from "./controllers/Product";

const app = express();

connectDB();

// parse incomming request to json
app.use(express.json());

// check the connectivity of the Database
app.use(dbConnectionMiddleware);

// parse response to json
app.use(jsonMiddleware);


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
