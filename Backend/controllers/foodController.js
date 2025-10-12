const axios = require("axios");
const FoodItem = require("./../models/foodModel");
const catchAsync=require("./../utils/catchAsync");
const User=require("./../models/userModel");

const {createNotification}=require("./../utils/createNotification");

// Add a new food item


exports.addFoodItem = async (req, res) => {
  try {
    const {
      category,
      foodItem,
      preparedAt,
      quantity,
      description,
      packaging,
      weightKg,
      pickupLocation,
      dropLocation,
    } = req.body;

    // 1️⃣ Call Flask AI API
    // http://127.0.0.1:5000/predict
    const flaskResponse = await axios.post("https://food-expiry-ai.onrender.com/predict", {
      category,
      food_item: foodItem,
      preparedAt,
    });

    const data = flaskResponse.data;

    // 2️⃣ Handle errors from Flask
    if (data.error) {
      return res.status(400).json({ error: data.error, ...data });
    }

    // 3️⃣ Check if predicted expiry is already past
    const now = new Date();
    const predictedExpiry = new Date(data.predicted_expiry);
    if (predictedExpiry < now) {
      return res.status(400).json({ 
        error: "Food already expired. Cannot donate.",
        predictedExpiry
      });
    }

    // 4️⃣ Save to MongoDB with 'pending' status
    const newFood = await FoodItem.create({
      donor: req.user._id,
      category: data.category,
      foodItem: data.food_item,
      ingredients: data.ingredients,
      quantity,
      description,
      packaging,
      weightKg,
      preparedAt,
      predictedExpiry: data.predicted_expiry,
      expiryHours: data.expiry_hours,
      pickupLocation,
      dropLocation,
      status: "pending" // admin approval needed
    });

      const admins = await User.find({ role: "admin" });
    for (const admin of admins) {
      await createNotification({
        userId: admin._id,
        type: "food_status",
        message: `New food donation from ${req.user.name}: "${newFood.foodItem}". Please review and approve.`,
        foodItemId: newFood._id,
      });
    }

    res.status(201).json({
      message: "Food item added successfully! Pending admin approval.",
      foodItem: newFood,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};





exports.getAllFood = catchAsync(async (req, res, next) => {
  let query = {};

  // If volunteer: show only available food
  if (req.user.role === 'volunteer') {
    query.status = 'available';
  }

  // If donor: show only their own food items
  if (req.user.role === 'donor') {
    query.donor = req.user._id;
  }

  const foodItems = await FoodItem.find(query).populate('donor', 'name email phone');

  res.status(200).json({
    status: 'success',
    results: foodItems.length,
    data: {
      foodItems,
    },
  });
});


// Volunteer claims food
exports.claimFood = catchAsync(async (req, res, next) => {
  const food = await FoodItem.findById(req.params.id);

  if (!food) return res.status(404).json({ message: "Food not found" });
  if (food.status !== "available")
    return res.status(400).json({ message: "Food not available" });

  food.volunteer = req.user._id;
  food.pickupStatus = "pending";
  food.status="picked";
  await food.save();


  await createNotification({
    userId: food.donor._id,
    type: "claim",
    message: `Your food "${food.foodItem}" has been claimed by a volunteer(${req.user.name}).`,
    foodItemId: food._id,
  });

  res.status(200).json({
    message: "Food claimed successfully",
    foodItem: food,
  });
});

// Volunteer marks pickup complete
exports.completePickup = catchAsync(async (req, res, next) => {
  const food = await FoodItem.findById(req.params.id);

  if (!food) return res.status(404).json({ message: "Food not found" });
  if (!food.volunteer || !food.volunteer.equals(req.user._id))
    return res.status(403).json({ message: "You cannot complete this pickup" });

  food.pickupStatus = "completed";
  food.status = "delivered"; // Optional: mark food as collected
  await food.save();

  
  await createNotification({
    userId: food.donor._id,
    type: "delivery",
    message: `Your food "${food.foodItem}" has been delivered Successfully  ✅! Thanks for donating Food!.`,
    foodItemId: food._id,
  });

  res.status(200).json({
    message: "Pickup completed successfully",
    foodItem: food,
  });
});


