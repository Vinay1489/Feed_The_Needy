const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const FoodItem=require("./../models/foodModel");
const {createNotification }=require("./../utils/createNotification");

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
  const admin = await User.findOne({ _id: req.params.id, role: 'admin' }).populate({
  path: "notifications",
  select: "type message foodItem read createdAt",
  populate: { path: "foodItem", select: "foodItem category predictedExpiry" }
});


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


// Get all pending food items (for admin)
exports.getPendingFood = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admin only." });
  }

  const pendingFood = await FoodItem.find({ status: "pending" }).populate("donor", "name email phone");

  res.status(200).json({
    status: "success",
    results: pendingFood.length,
    data: {
      foodItems: pendingFood,
    },
  });
});


// Approve or reject a food item
exports.updateFoodStatus = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admin only." });
  }

  const { id } = req.params;
  const { status } = req.body; // "available" or "rejected"

  if (!["available", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status. Must be 'available' or 'rejected'." });
  }

  const foodItem = await FoodItem.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!foodItem) {
    return res.status(404).json({ error: "Food item not found." });
  }


  await createNotification({
    userId: foodItem.donor._id,
    type: "food_status",
    message: `Your food "${foodItem.foodItem}" has been ${status === "available" ? "approved" : "rejected"} by the admin.`,
    foodItemId: foodItem._id,
  });


  res.status(200).json({
    status: "success",
    message: `Food item ${status === "available" ? "approved" : "rejected"} successfully.`,
    data: {
      foodItem,
    },
  });
});


exports.getAllDonations = catchAsync(async (req, res, next) => {
  const foods = await FoodItem.find()
    .populate("donor", "name email")
    .populate("volunteer", "name email");

  res.status(200).json({
    status: "success",
    results: foods.length,
    data: { foods },
  });
});


exports.getDashboardStats = catchAsync(async (req, res, next) => {
  const totalFoods = await FoodItem.countDocuments();
  const approvedFoods = await FoodItem.countDocuments({ status: "available" });
  const pickedFoods = await FoodItem.countDocuments({ status: "picked" });
  const collectedFoods = await FoodItem.countDocuments({ status: "delivered" });

  res.status(200).json({
    status: "success",
    data: {
      totalFoods,
      approvedFoods,
      pickedFoods,
      collectedFoods,
    },
  });
});


