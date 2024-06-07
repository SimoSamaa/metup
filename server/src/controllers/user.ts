import { Request, Response, NextFunction } from 'express';
import { hash, compare } from 'bcryptjs';
import { verify, Secret } from 'jsonwebtoken';
import { User, IUser } from '../models/users';
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

// ACTIVATE ACCOUNT
export const activateAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    type UserToken = { id: string; iat: number, exp: number; };

    const { token } = req.body as { token: string; };
    const userToken: UserToken = verify(token, process.env.TOKEN_SECRET as Secret) as UserToken;
    const user: IUser | null = await User.findById(userToken.id);

    // CHECK IF USER NOT EXIST
    HandledError.notFound(user, 'User Not Found');

    if (user!.verified === true) {
      res.status(400).json({ message: 'Account already activated.' });
    } else {
      await User.findByIdAndUpdate(userToken.id, { verified: true });
      res.status(200).json({ message: 'Account activated successfully.' });
    }

  } catch (err: unknown | Error) {
    HandledError.ctachError(err, next);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // VALIAIDATION
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
      message: 'User logged successfully.'
    });

  } catch (err: unknown | Error) {
    HandledError.ctachError(err, next);
  }
};