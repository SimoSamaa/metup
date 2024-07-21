import { Router } from "express";
import { body } from 'express-validator';
import * as postController from '../controllers/post';
import isAuth from '../middleware/isAuth';

const router = Router();

router.post('/add-post', isAuth, [
  body('text')
    .notEmpty()
    .withMessage('text post required')
    .isString()
    .isLength({ min: 5 })
    .withMessage('text post must be at least 8 characters'),
], postController.createPost);

export default router;

