const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const donorController = require("./../controllers/donorController");

router.post("/signup", authController.signUpDonor);
router.post(
  "/login",
  (req, res, next) => {
    (req.role = "donor"), next();
  },
  authController.login
);

router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);

router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);

router.get("/", donorController.getAllDonors);

router
  .route("/:id")
  .get(donorController.getDonor)
  .patch(donorController.updateDonor)
  .delete(donorController.deleteDonor);

module.exports = router;
