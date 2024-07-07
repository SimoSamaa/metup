import { Router } from "express";
import { body } from 'express-validator';
import * as uploadController from '../controllers/upload';
import isAuth from '../middleware/isAuth';
import { uploadImages } from '../middleware/uploadFiles';

const router = Router();

router.post('/upload-images', uploadImages, uploadController.uploadImages);

export default router;

