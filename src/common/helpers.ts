import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { ModelSectionState } from '../entity/modelSectionState.entity';
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
    return res.status(StatusCodes.UNAUTHORIZED).send({
      success: false,
      message: 'No token provided',
    });
  }

  return jwt.verify(token, JWT_SECRET_KEY!, (err) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        success: false,
        message: 'Failed to authenticate token',
      });
    }
    return next();
  });
};

const MS_PER_DAY = 86400000;

export const checkSection = (state: ModelSectionState) => {
  const currentDate = new Date().toLocaleDateString();
  const completeDate =
    state.updatedDate.toLocaleDateString();
  console.log('state', state);
  console.log('currentDate', currentDate);
  console.log('completeDate', completeDate);

  const diff =
    Number(new Date()) - Number(state.updatedDate);
  console.log('diff is ', diff);

  if (
    (currentDate > completeDate &&
      !state.weeklyFirstRepeatDone) ||
    (state.weeklyFirstRepeatDone && diff > MS_PER_DAY)
  )
    return true;
  else if (
    currentDate >= completeDate &&
    !state.sameDayRepeatDone
  )
    return true;
};
