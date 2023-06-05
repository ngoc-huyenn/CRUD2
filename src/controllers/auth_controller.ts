import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/users_model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }

      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, 'auth1');
        user.token = token;

        await user.save();
        res.status(200).json({
          status: 'Successful!',
          data: { user_name: user.name, token: user.token },
        });
      } else {
        return res.status(500).json({ message: 'Password is not correct!' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = await UserModel.create({ name, email, password });

      const token = jwt.sign({ user_id: user.id }, 'auth1');
      user.token = token;

      await user.save();

      res.status(200).json({
        status: 'Successful!',
        data: { user_name: user.name, token: user.token },
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = '';

      res.status(200).json({
        status: 'Successful!',
        message: 'You have been logged out',
        data: { token },
      });
    } catch (error) {
      res.status(500).json({ message: 'Error!' });
    }
  }
}

export default new AuthController();
