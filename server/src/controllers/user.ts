import { Request, Response, NextFunction } from 'express';
import { hash, compare } from 'bcryptjs';
import { verify, Secret } from 'jsonwebtoken';
import { User, IUser } from '../models/users';
import HandledError from '../utils/handledError';
import generateToken from '../utils/jwt';
import sendEmail from '../utils/mailer';
import verificationTemp from '../emails/verification';

// REGISTER USER (SIGNUP)
export const register = async (req: Request, res: Response, next: NextFunction) => {

  try {
    // VALIDATION
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

    // SEND EMAIL VALIDATION
    const emailToken = generateToken({ id }, '1h');
    const url = `${process.env.CLIENT_URL}/activate/${emailToken}`;
    const emailVerification = verificationTemp(user.firstName, url);
    sendEmail(user.email, 'METUP Verification Email', emailVerification);

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
    });
    return;
  } catch (err: unknown | Error) {
    HandledError.serverFail(err, next);
    return err;
  }
};

// ACTIVATE ACCOUNT
export const activateAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    type UserToken = { id: string; iat: number, exp: number; };

    const { token } = req.body as { token: string; };
    const userToken = verify(token, process.env.TOKEN_SECRET as Secret) as UserToken;
    const user: IUser | null = await User.findById(userToken.id);

    // CHECK IF USER NOT EXIST
    HandledError.notFound(user, 'User Not Found');

    if (user!.verified === true) {
      res.status(400).json({ message: 'Account already activated.' });
    } else {
      await User.findByIdAndUpdate(userToken.id, { verified: true });
      res.status(200).json({ message: 'Account activated successfully.' });
    }

    return;

  } catch (err: unknown | Error) {
    HandledError.serverFail(err, next);
    return err;
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // VALIDATION
    HandledError.validation(req, 422);

    const { email, password } = req.body as { email: string; password: string; };
    const user: IUser | null = await User.findOne({ email });

    // CHECK IF USER NOT EXIST
    HandledError.notFound(user, 'A user withe this email could not be found.');

    // CHECK IF PASSWORD IS CORRECT
    const existPass = await compare(password, user!.password);
    if (!existPass) {
      const error = new HandledError('Password is incorrect try again', 401);
      throw error;
    }

    // SEND RESPONSE DATA
    const id = String(user!.toObject()._id).toString();
    const token = generateToken({ id }, '1h');

    // SEND RESPONSE DATA
    res.status(201).json({
      id,
      token,
      username: user!.username,
      picture: user!.picture,
      firstName: user!.firstName,
      lastName: user!.lastName,
      verified: user!.verified,
    });
    return;

  } catch (err: unknown | Error) {
    HandledError.serverFail(err, next);
    return err;
  }
};