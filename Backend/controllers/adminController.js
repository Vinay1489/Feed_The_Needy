const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');


// 🔍 Filter only admins
exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const admins = await User.find({ role: 'admin' });
  res.status(200).json({
    status: 'success',
    results: admins.length,
    data: {
      admins,
    },
  });
});

// 🔍 Get a single admin by ID (with role check)
exports.getAdmin = catchAsync(async (req, res, next) => {
  const admin = await User.findOne({ _id: req.params.id, role: 'admin' });
  if (!admin) return next(new AppError('No admin found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      admin,
    },
  });
});

// 🛠 Update admin (name/email/photo only)
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateAdmin = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedAdmin = await User.findOneAndUpdate(
    { _id: req.params.id, role: 'admin' },
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!updatedAdmin) return next(new AppError('No admin found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      admin: updatedAdmin,
    },
  });
});

// ❌ Delete admin (hard delete or soft delete)
exports.deleteAdmin = catchAsync(async (req, res, next) => {
  const admin = await User.findOneAndDelete({
    _id: req.params.id,
    role: 'admin',
  });

  if (!admin) return next(new AppError('No admin found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
