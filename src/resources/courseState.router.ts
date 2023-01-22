import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  getCourseStateArr,
  getCourseState,
  addCourseState,
} from './courseState.service';

const router = Router();

router.route('/').get(async (_, res) => {
  try {
    const courseStateArr = await getCourseStateArr();
    res.json(courseStateArr);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).send(error);
  }
});

router
  .route('/:progressId.:courseId')
  .get(async (req, res) => {
    try {
      const courseState = await getCourseState(
        Number(req.params.progressId),
        Number(req.params.courseId)
      );
      res.json(courseState);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send(error);
    }
  });

router
  .route('/:progressId.:courseId')
  .post(async (req, res) => {
    try {
      const results = await addCourseState(
        Number(req.params.progressId),
        Number(req.params.courseId)
      );
      return res.status(StatusCodes.OK).send(results);
    } catch (error) {
      res.status(StatusCodes.NOT_ACCEPTABLE).send(error);
    }
  });

// router.route('/:id').delete(async (req, res) => {
//   try {
//     const elemToRemove = await wordRepo.findOneBy({
//       id: Number(req.params.id),
//     });
//     if (elemToRemove) {
//       await wordRepo.remove(elemToRemove);
//       return res.status(StatusCodes.OK).send(elemToRemove);
//     }
//     return res
//       .status(StatusCodes.NOT_ACCEPTABLE)
//       .send('element is not exist');
//   } catch (error) {
//     res.status(StatusCodes.BAD_REQUEST).send(error);
//   }
// });

export { router as courseStateRouter };
