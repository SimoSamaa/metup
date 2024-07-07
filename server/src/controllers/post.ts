import { Request, Response, NextFunction } from 'express';
import Post from '../models/post';
import HandledError from '../utils/handledError';

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = new Post(req.body).save();
    res.status(201).json(post);
  } catch (err) {
    HandledError.serverFail(err, next);
    return err;
  }
};