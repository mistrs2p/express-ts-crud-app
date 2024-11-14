import { NextFunction, Router, type Request, type Response } from "express";
import { login } from "./Auth/Login";
import { register } from "./Auth/Register";
import { deleteUser } from "./Delete";
import { show } from "./Show";
import { update } from "./Update";
import ResponseHandler from "@/services/Response";
import authMiddleware from "@/middlewares/authMiddleware";
import roleMiddleware from "@/middlewares/roleMiddleware";


const userRoute = Router()
function handler(fn: (req: Request, res: Response) => Promise<ResponseHandler>) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res)
      .then((data) => data.done(res))
      .catch((err) => next(err));
  };
}

userRoute.get('/', authMiddleware, roleMiddleware('admin'), handler(show));
userRoute.delete('/:id', authMiddleware, roleMiddleware('admin'), handler(deleteUser));
userRoute.patch('/:id', authMiddleware, handler(update));

export default userRoute;