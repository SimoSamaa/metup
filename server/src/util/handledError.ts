import { validationResult } from 'express-validator';
import { Request, NextFunction } from 'express';
import { IUser } from '../models/users';


class HandledError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  static validation(req: Request, statusCode: number) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new HandledError(errors.array()[0].msg, statusCode);
      throw error;
    }
  }

  static notFound(model: IUser | null, mess: string) {
    if (!model) {
      const error = new HandledError(mess, 404);
      throw error;
    }
  }

  static ctachError(err: unknown | Error, next: NextFunction) {
    type errObj = { statusCode: number; message: string; };
    const error = err as errObj;

    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(err);
  }
}

export default HandledError;