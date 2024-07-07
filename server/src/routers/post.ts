import { Router } from "express";
import { body } from 'express-validator';
import * as postController from '../controllers/post';
import isAuth from '../middleware/isAuth';

const router = Router();

router.post('/add-post', postController.createPost);

export default router;

