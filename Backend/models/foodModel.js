const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    volunteer: {
  type: mongoose.Schema.ObjectId,
  ref: "User",
  default: null
    },
    category: {
      type: String,
      required: [true, "Food item must have a category"],
    },
    foodItem: {
      type: String,
      required: [true, "Food item must have a name"],
    },
    ingredients: {
      type: [String], // from Flask AI model
      default: [],
    },
     ingredients: {
    type: [String]
  },
    quantity: {
      type: Number,
      required: [true, "Please specify quantity"],
    },
    description: String,
    preparedAt: {
      type: Date,
      required: [true, "Please specify when the food was prepared"],
    },
    packaging: {
      type: String,
      enum: ["box", "container", "bag", "other"],
      default: "other",
    },
    weightKg: Number,

    // AI model prediction output
    predictedExpiry: Date,
    expiryHours: Number, // number of hours until expiry

    // Food lifecycle tracking
    status: {
      type: String,
      enum: ["available", "picked", "in_transit", "delivered", "expired","pending","rejected"],
      default: "available",
    },
    pickupStatus: {
  type: String,
  enum: ["pending", "completed", "none"],
  default: "none"
},

    pickupLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },
    dropLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: [Number],
    },
  },
  { timestamps: true }
);

// Enable geospatial queries
foodItemSchema.index({ pickupLocation: "2dsphere" });

const FoodItem = mongoose.model("FoodItem", foodItemSchema);
module.exports = FoodItem;
