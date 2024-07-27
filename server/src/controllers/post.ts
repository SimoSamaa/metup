import { Request, Response, NextFunction } from 'express';
import Post, { IPost } from '../models/post';
import HandledError from '../utils/handledError';

// CREATE POST
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    HandledError.validation(req, 422);

    const post = new Post(req.body);
    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate('user', 'firstName lastName picture gender username');

    res.status(201).json(populatedPost);
  } catch (err) {
    HandledError.serverFail(err, next);
    return err;
  }
};

// GET ALL POSTS
export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts: IPost[] = await Post.find()
      .populate('user', 'firstName lastName picture gender username verified').sort({ createdAt: -1 });

    res.status(200).json(posts);
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