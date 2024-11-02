import { Router } from "express";
import { login } from "@/controllers/User/Auth/Login";
import { register } from "@/controllers/User/Auth/Register";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
