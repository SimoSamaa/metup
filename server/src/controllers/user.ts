import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/types/userType';
import { hash } from 'bcryptjs';
import User from '../models/users';
import HandledError from '../util/handledError';
import generateToken from '../util/jwt';
import sendEmail from '../util/mailer';
import verificationTemp from '../emails/verification';

// REGISTER USER (SIGNUP)
export const register = async (req: Request, res: Response, next: NextFunction) => {

  try {
    // VALIAIDATION
    HandledError.validation(req, 422);

    const dataRegister: IUser = req.body;

    // HASH PASSWORD
    const hashedPass = await hash(dataRegister.password, 12);

    // CREATE USERNAME
    let username = dataRegister.firstName + dataRegister.lastName;
    const uniqueUsername = username + String(Date.now() * Math.random()).slice(0, 1);
    const matchUsername = await User.findOne({ username: username });
    if (matchUsername) username = uniqueUsername;

    // SAVE USER DATA IN DATABASE
    const user: IUser = new User({
      ...dataRegister,
      password: hashedPass,
      username: username
    });

    await user.save();

    // USER ID
    const id = String(user.toObject()._id).toString();

    // SEND EMAIL VIRIFICATION
    const emailToken = generateToken({ id }, '1h');
    const url = `${process.env.CLIENT_URL}/activate/${emailToken}`;
    const emailVerification = verificationTemp(user.firstName, url);

    sendEmail(user.email, 'METUP Virefication Email', emailVerification);

    // CREATE GENERATE USER TOKEN
    const token = generateToken({ id }, '1h');

    // SEND RESPONSE DATA
    res.status(201).json({
      id,
      token,
      username: user.username,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
      verified: user.verified,
      message: 'User created successfully, please check your email to verify your account.'
    });

  } catch (err: unknown | Error) {
    HandledError.ctachError(err, next);
  }
};
