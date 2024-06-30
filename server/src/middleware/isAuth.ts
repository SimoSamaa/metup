import { Request, Response, NextFunction } from 'express';
import HandledError from '../utils/handledError';
import { verify, Secret } from 'jsonwebtoken';

interface UserRequest extends Request {
  user?: any;
}

export default async (req: UserRequest, res: Response, next: NextFunction) => {
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

      req.user = user;
      next();
    });
  } catch (err) {
    HandledError.serverFail(err, next);
    return err;
  }
};