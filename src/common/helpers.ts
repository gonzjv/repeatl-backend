import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { ModelSectionState } from '../entity/modelSectionState.entity';
import { JWT_SECRET_KEY } from './config';
import { WordSectionState } from '../entity/wordSectionState.entity';

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
const MS_PER_SIX_DAYS = 6 * MS_PER_DAY;
const MS_PER_13_DAYS = 13 * MS_PER_DAY;
const MS_PER_29_DAYS = 29 * MS_PER_DAY;
const MS_PER_59_DAYS = 59 * MS_PER_DAY;
const MS_PER_179_DAYS = 179 * MS_PER_DAY;

export const checkSection = (
  state: ModelSectionState | WordSectionState
) => {
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

  const {
    sameDayRepeatDone,
    weeklyFirstRepeatDone,
    weeklySecondRepeatDone,
    weekly3done,
    weekly4Done,
    weekly5Done,
    weekly6Done,
    secondWeekDone,
    secondWeekAndDayDone,
    fourthWeekDone,
    fourthWeekAndDayDone,
    secondMonthDone,
    secondMonthAndDayDone,
    fourthMonthDone,
    fourthMonthAndDayDone,
    tenthMonthDone,
    tenthMonthAndDayDone,
  } = state;
  const isSameDayRepeatNeeded =
    currentDate >= updateDate && !sameDayRepeatDone;

  const isWeeklyFirstRepeatNeeded =
    currentDate > updateDate && !weeklyFirstRepeatDone;

  const isWeeklySecondRepeatNeeded =
    weeklyFirstRepeatDone &&
    !weeklySecondRepeatDone &&
    currentDate00am > updateDateMs;

  const isWeekly3needed =
    weeklySecondRepeatDone &&
    !weekly3done &&
    currentDate00am > updateDateMs;

  const isWeekly4needed =
    weekly3done &&
    !weekly4Done &&
    currentDate00am > updateDateMs;

  const isWeekly5needed =
    weekly4Done &&
    !weekly5Done &&
    currentDate00am > updateDateMs;

  const isWeekly6needed =
    weekly5Done &&
    !weekly6Done &&
    currentDate00am > updateDateMs;

  const isSecWeekNeed =
    weekly6Done &&
    !secondWeekDone &&
    currentDate00am > updateDateMs + MS_PER_SIX_DAYS;

  const isSecWeekAndDayNeed =
    secondWeekDone &&
    !secondWeekAndDayDone &&
    currentDate00am > updateDateMs;

  const isFourthWeekNeed =
    secondWeekAndDayDone &&
    !fourthWeekDone &&
    currentDate00am > updateDateMs + MS_PER_13_DAYS;

  const isFourthWeekAndDayNeed =
    fourthWeekDone &&
    !fourthWeekAndDayDone &&
    currentDate00am > updateDateMs;

  const isSecondMonthNeed =
    fourthWeekAndDayDone &&
    !secondMonthDone &&
    currentDate00am > updateDateMs + MS_PER_29_DAYS;

  const isSecondMonthAndDayNeed =
    secondMonthDone &&
    !secondMonthAndDayDone &&
    currentDate00am > updateDateMs;

  const isFourthMonthNeed =
    secondMonthAndDayDone &&
    !fourthMonthDone &&
    currentDate00am > updateDateMs + MS_PER_59_DAYS;

  const isFourthMonthAndDayNeed =
    fourthMonthDone &&
    !fourthMonthAndDayDone &&
    currentDate00am > updateDateMs;

  const isTenthMonthNeed =
    fourthMonthAndDayDone &&
    !tenthMonthDone &&
    currentDate00am > updateDateMs + MS_PER_179_DAYS;

  const isTenthMonthAndDayNeed =
    tenthMonthDone &&
    !tenthMonthAndDayDone &&
    currentDate00am > updateDateMs;

  if (
    isSameDayRepeatNeeded ||
    isWeeklyFirstRepeatNeeded ||
    isWeeklySecondRepeatNeeded ||
    isWeekly3needed ||
    isWeekly4needed ||
    isWeekly5needed ||
    isWeekly6needed ||
    isSecWeekNeed ||
    isSecWeekAndDayNeed ||
    isFourthWeekNeed ||
    isFourthWeekAndDayNeed ||
    isSecondMonthNeed ||
    isSecondMonthAndDayNeed ||
    isFourthMonthNeed ||
    isFourthMonthAndDayNeed ||
    isTenthMonthNeed ||
    isTenthMonthAndDayNeed
  )
    return true;
};
