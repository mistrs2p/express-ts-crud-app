import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../schemas/User';



// Admin-only: Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
};

// Admin-only: Delete a user (Admins and Users)
export const deleteUser = async (req: Request, res: Response):Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user && user.role === 'admin') {
       res.status(403).json({ message: 'Cannot delete admin' });
       return
    }
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};