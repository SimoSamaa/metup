import { Router } from "express";
import { body } from 'express-validator';
import * as userController from '../controllers/user';
import User from '../models/users';
import isAuth from '../middleware/isAuth';

const router = Router();

router.post('/register',
  [
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name is required.')
      .isString()
      .withMessage('First name must be a string.')
      .isLength({ min: 5, max: 20 })
      .withMessage('First name must be between 5 and 20 characters long.'),

    body('lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name is required.')
      .isString()
      .withMessage('Last name must be a string.')
      .isLength({ min: 5, max: 20 })
      .withMessage('Last name must be between 5 and 20 characters long.'),

    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail()
      .custom(async (value) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          throw new Error('E-mail already exists!');
        }
      }),

    body('password')
      .isString()
      .withMessage('Password must be a string.')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8.')
      .isStrongPassword()
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
  ],

  userController.register
);

router.post('/activate', isAuth, userController.activateAccount);

router.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),

    body('password')
      .isString()
      .withMessage('Password must be a string.')
      .isLength({ min: 8 })
  ],
  userController.login);

router.post('/resend-email-activate', isAuth, userController.resendEmailActivate);

export default router;
