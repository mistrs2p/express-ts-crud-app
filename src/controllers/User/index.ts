import {  Router } from "express";
import { deleteUser } from "./Delete";
import { show } from "./Show";
import { update } from "./Update";
import authMiddleware from "@/middlewares/authMiddleware";
import roleMiddleware from "@/middlewares/roleMiddleware";
import handler from "@/utils/handler";

const userRoute = Router()
userRoute.get('/', authMiddleware, roleMiddleware('admin'), handler(show));
userRoute.delete('/:id', authMiddleware, roleMiddleware('admin'), handler(deleteUser));
userRoute.patch('/:id', authMiddleware, handler(update));

export default userRoute;