import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './config';

export const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  console.log('token', token);
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({
        success: false,
        message: 'No token provided',
      });
  }

  return jwt.verify(
    token,
    JWT_SECRET_KEY!,
    (err) => {
      if (err) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send({
            success: false,
            message:
              'Failed to authenticate token',
          });
      }
      return next();
    }
  );
};
