import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/users_model';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const Authorization = req.header('authorization');

  if (!Authorization)
    return res.status(401).json({ message: 'Unauthorized!!' });

  const token = Authorization.replace('Bearer ', '');

  try {
    if (!token)
      return res.status(401).json({ message: 'Unauthorized: missing token' });

    // Verify
    const payload = (await jwt.verify(token, 'auth1')) as JwtPayload;
    const { userId } = payload;

    // Assign req
    req.user = { userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: ' + String(error) });
  }
}
