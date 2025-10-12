const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["food_status", "claim", "general","delivery"], required: true },
    message: { type: String, required: true },
    foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
