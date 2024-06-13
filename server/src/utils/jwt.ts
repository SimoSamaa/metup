import { sign, Secret } from 'jsonwebtoken';

const secretKey = process.env.TOKEN_SECRET as Secret;

const generateToken = (payload: object, expiresIn: string) => {
  return sign(payload, secretKey, { expiresIn: expiresIn });
};

export default generateToken;