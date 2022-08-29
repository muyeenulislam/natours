const Review = require('../models/reviewModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  // allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// get all the reviews
exports.getAllReviews = factory.getAll(Review);
// get review
exports.getReview = factory.getOne(Review);
// create a review
exports.createReview = factory.createOne(Review);
// delete review
exports.deletReview = factory.deleteOne(Review);
// update review
exports.updateReview = factory.updateOne(Review);
