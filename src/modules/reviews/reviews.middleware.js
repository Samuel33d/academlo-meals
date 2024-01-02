import { AppError } from '../../commons/errors/appError.js';
import { catchAsync } from '../../commons/errors/catchAsync.js';
import { ReviewsServices } from './reviews.service.js';

export const validateReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await ReviewsServices.findOne(id);

  if (!review) {
    return next(new AppError(`Review with id ${id} not found`, 404));
  }

  req.review = review;
  req.user = review.user;
  next();
});
