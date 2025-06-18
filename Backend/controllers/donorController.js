const AppError = require("./../utils/appError");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

// 🔍 Filter only donors
exports.getAllDonors = catchAsync(async (req, res, next) => {
  const donors = await User.find({ role: "donor" });
  res.status(200).json({
    status: "success",
    results: donors.length,
    data: {
      donors,
    },
  });
});

// 🔍 Get a single donor by ID (with role check)
exports.getDonor = catchAsync(async (req, res, next) => {
  const donor = await User.findOne({ _id: req.params.id, role: "donor" });
  if (!donor) return next(new AppError("No donor found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      donor,
    },
  });
});

// 🛠 Update donor (name/email/photo only)
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateDonor = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedDonor = await User.findOneAndUpdate(
    { _id: req.params.id, role: "donor" },
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!updatedDonor)
    return next(new AppError("No donor found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      donor: updatedDonor,
    },
  });
});

// ❌ Delete donor (hard delete or soft delete)
exports.deleteDonor = catchAsync(async (req, res, next) => {
  const donor = await User.findOneAndDelete({
    _id: req.params.id,
    role: "donor",
  });

  if (!donor) return next(new AppError("No donor found with that ID", 404));

  res.status(204).json({
    status: "success",
    data: null,
  });
});
