const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');

// alert
// exports.alerts = (req, res, next) => {
//   const { alert } = req.query;
//   if (alert === 'booking')
//     res.locals.alert =
//       'Your booking was successful. If your booking does not appear immediately, please try again later.';
//   next();
// };

// overview page
exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. get all tour data from collection
  const tours = await Tour.find();

  // 2. build template

  //   3. render that tempalate using tour data

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

// tour detail page
exports.getTour = catchAsync(async (req, res, next) => {
  // 1. get data about the requested tour
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating using',
  });
  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }
  // 2.build template
  // 3.render template
  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
});

// login page
exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

// signup page
exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your account',
  });
};

// get account data
exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

// get tours users booked
exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1. find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2.find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUSer = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
