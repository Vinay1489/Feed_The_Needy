const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');


// 🔍 Filter only volunteers
exports.getAllVolunteers = catchAsync(async (req, res, next) => {
  const volunteers = await User.find({ role: 'volunteer' });
  res.status(200).json({
    status: 'success',
    results: volunteers.length,
    data: {
      volunteers,
    },
  });
});

// 🔍 Get a single volunteer by ID (with role check)
exports.getVolunteer = catchAsync(async (req, res, next) => {
  const volunteer = await User.findOne({ _id: req.params.id, role: 'volunteer' }).populate({
  path: "notifications",
  select: "type message foodItem read createdAt",
  populate: { path: "foodItem", select: "foodItem category predictedExpiry" }
});

  if (!volunteer) return next(new AppError('No volunteer found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      volunteer,
    },
  });
});

// 🛠 Update volunteer (name/email/photo only)
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateVolunteer = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedVolunteer = await User.findOneAndUpdate(
    { _id: req.params.id, role: 'volunteer' },
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!updatedVolunteer) return next(new AppError('No volunteer found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      volunteer: updatedVolunteer,
    },
  });
});

// ❌ Delete volunteer (hard delete or soft delete)
exports.deleteVolunteer = catchAsync(async (req, res, next) => {
  const volunteer = await User.findOneAndDelete({
    _id: req.params.id,
    role: 'volunteer',
  });

  if (!volunteer) return next(new AppError('No volunteer found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
