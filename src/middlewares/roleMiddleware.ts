import { Request, Response, NextFunction } from 'express';

const roleMiddleware = (role: 'admin' | 'user') => {
  return (req: Request, res: Response, next: NextFunction):void => {
    if ((req as any).user.role !== role) {
       res.status(403).json({ message: 'Access denied' });
       return
    }
    next();
  };
};

export default roleMiddleware;