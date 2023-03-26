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

// const MS_PER_DAY = 86400000;

export const checkSection = (state: ModelSectionState) => {
  const currentDate = new Date().toLocaleDateString();
  const updateDate = state.updatedDate.toLocaleDateString();
  const updateDateMs = Number(state.updatedDate);
  console.log('state', state);
  console.log('currentDate', currentDate);
  console.log('completeDate', updateDate);

  const currentDate00am = Date.parse(currentDate);
  const diff = Number(new Date()) - updateDateMs;
  console.log('diff is ', diff);
  console.log('currentDate at 00 ', currentDate00am);
  console.log('currentDate in ms ', Number(new Date()));
  console.log('updateDate  in ms ', updateDateMs);

  const isSameDayRepeatNeeded =
    currentDate >= updateDate && !state.sameDayRepeatDone;

  const isWeeklyFirstRepeatNeeded =
    currentDate > updateDate &&
    !state.weeklyFirstRepeatDone;

  const isWeeklySecondRepeatNeeded =
    state.weeklyFirstRepeatDone &&
    !state.weeklySecondRepeatDone &&
    currentDate00am > updateDateMs;

  // const isSecWeekNeed =
  //   state.weeklySixRepeatDone &&
  //   !state.secWeekRepeatDone &&
  //   currentDate00am > updateDateMs + 6*MS_PER_DAY;

  if (
    isSameDayRepeatNeeded ||
    isWeeklyFirstRepeatNeeded ||
    isWeeklySecondRepeatNeeded
  )
    return true;
};
