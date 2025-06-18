const express=require("express");
const router=express.Router();
const userController=require("../controllers/userController");
const authController=require("../controllers/authController");


router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser,
);

// router.post('/signup', authController.signUp);

// router.post('/login', authController.login);

// router.get('/logout', authController.logout);

// router.post('/forgotPassword', authController.forgotPassword);

// router.patch('/resetPassword/:token', authController.resetPassword);

// // protect all the routers after this middleware.....alternate short hand of putting authcontroller.protect in every below middlewares
router.use(authController.protect);

// router.patch('/updateMyPassword', authController.updatePassword);

router.patch(
  '/updateMe',
// userController.uploadUserPhoto,
//   userController.resizeUserPhoto,
  userController.updateMe,
 );

router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers);

router
  .route(`/:id`)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
