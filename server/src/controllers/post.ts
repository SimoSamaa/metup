import { Request, Response, NextFunction } from 'express';
import Post from '../models/post';
import HandledError from '../utils/handledError';

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    HandledError.validation(req, 422);

    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    HandledError.serverFail(err, next);
    return err;
  }
};

// const authorized = (obj, req) => {
//   if(obj.creator.toString() !== req.userId) {
//     const error = new Error('Not authorized!');
//     error.statusCode = 403;
//     throw error;
//   }
// };