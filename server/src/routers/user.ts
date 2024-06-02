import { Router } from "express";
import * as userController from '../controllers/user';

const router = Router();

router.get('/', userController.getUsers);

export default router;
