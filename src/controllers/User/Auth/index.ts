import handler from "@/utils/handler";
import { Router } from "express";
import { register } from "./Register";
import { login } from "./Login";

const authRoute = Router();

authRoute.post("/register", handler(register));
authRoute.post("/login", handler(login));

export default authRoute;
