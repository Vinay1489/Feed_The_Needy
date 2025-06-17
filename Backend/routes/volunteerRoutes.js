const express = require("express");
const router = express.Router();
const volunteerController = require("./../controllers/volunteerController");
const authController = require("../controllers/authController");

router.post("/signup", authController.signUpVolunteer);

router.post(
  "/login",
  (req, res, next) => {
    (req.role = "volunteer"), next();
  },
  authController.login
);

router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);

router.patch("/resetPassword/:token", authController.resetPassword);

// protect all the routers after this middleware.....alternate short hand of putting authcontroller.protect in every below middlewares
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);

router.route("/").get(volunteerController.getAllVolunteers);

router
  .route(`/:id`)
  .get(volunteerController.getVolunteer)
  .patch(volunteerController.updateVolunteer)
  .delete(volunteerController.deleteVolunteer);

module.exports = router;
