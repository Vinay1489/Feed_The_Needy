const express = require("express");
const router = express.Router();
const foodController = require("./../controllers/foodController");
const authController=require("./../controllers/authController");



router.use(authController.protect);

router.post("/add",authController.restrictTo("donor") ,foodController.addFoodItem);

router.get("/getAllFood",foodController.getAllFood);

// Volunteer claims food
router.patch("/claim/:id", authController.restrictTo("volunteer"), foodController.claimFood);

// Volunteer marks as collected
router.patch("/complete/:id", authController.restrictTo("volunteer"), foodController.completePickup);

module.exports = router;
