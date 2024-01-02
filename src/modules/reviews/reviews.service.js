import User from '../users/users.model.js';
import Review from './reviews.model.js';

export class ReviewsServices {
  static async create(data) {
    return await Review.create(data);
  }

  static async findOne(id) {
    return await Review.findOne({
      where: {
        id,
        status: 'active',
      },
      include: [
        {
          model: User,
        },
      ],
    });
  }

  static async update(review, data) {
    return await review.update(data);
  }

  static async delete(review) {
    return await review.update({ status: 'deleted' });
  }
}
