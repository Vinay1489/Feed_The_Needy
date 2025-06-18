const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const adminController = require("./../controllers/adminController");
const authController = require("../controllers/authController");

// router.get(
//   '/me',
//   authController.protect,
//   userController.getMe,
//   adminController.getAdmin,
// );

router.post("/signup", authController.signUpAdmin);

router.post(
  "/login",
  (req, res, next) => {
    (req.role = "admin"), next();
  },
  authController.login
);

router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);

router.patch("/resetPassword/:token", authController.resetPassword);

// protect all the routers after this middleware.....alternate short hand of putting authcontroller.protect in every below middlewares
router.use(authController.protect, authController.restrictTo("admin"));

router.patch("/updateMyPassword", authController.updatePassword);

//  router.patch(
//   '/updateMe',
// //   userController.uploadUserPhoto,
// //   userController.resizeUserPhoto,
//   userController.updateMe,
//  );

// router.delete('/deleteMe', userController.deleteMe);

// router.use(authController.restrictTo('admin'));

router.route("/").get(adminController.getAllAdmins);

router
  .route(`/:id`)
  .get(adminController.getAdmin)
  .patch(adminController.updateAdmin)
  .delete(adminController.deleteAdmin);

module.exports = router;
