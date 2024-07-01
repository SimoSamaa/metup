import { Request, Response, NextFunction } from 'express';
import HandledError from '../utils/handledError';
import { verify, Secret } from 'jsonwebtoken';

interface UserRequest extends Request { userId?: string; }

export default async (req: UserRequest, _: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization');

    // CHECK IF AUTHORIZATION HEADER IS PRESENT
    if (!authHeader) {
      const error = new HandledError('Invalid Authentication', 401);
      throw error;
    }

    // CHECK IF TOKEN IS VALID
    const token = String(req.header('Authorization')).split(' ')[1];

    // VERIFY TOKEN
    verify(token, process.env.TOKEN_SECRET as Secret, (err, user) => {
      if (err) {
        const error = new HandledError('Invalid Authentication', 401);
        throw error;
      }

      req.userId = (user as { id: string; }).id;
      next();
    });
  } catch (err) {
    HandledError.serverFail(err, next);
    return err;
  }
};