const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const { promisify } = require("util");
const crypto = require("crypto");
const catchAsync = require("./../utils/catchAsync");
const { decode } = require("punycode");
const { create } = require("domain");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};

// exports.signUp = catchAsync(async (req, res, next) => {
//   // console.log("Request Body:", req.body);

//  if (req.body.role === 'admin') {
//     if (req.body.adminKey !== process.env.ADMIN_KEY) {
//       return next(
//         new AppError('Invalid admin key. Not authorized to sign up as admin.', 403)
//       );
//     }
//   }

//   const newUser = await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm,
//     passwordChangedAt: req.body.passwordChangedAt,
//     role: req.body.role,
//     phone: req.body.phone,
//     address: req.body.address,
//     transportMode:req.body.transportMode,
//     availability:req.body.availability,
//     organizationName: req.body.organizationName,
//     registrationNumber: req.body.registrationNumber,
//   });

//   const url = `${req.protocol}://${req
//     .get("host")
//     .replace("127.0.0.1", "localhost")}/me`;
//   console.log(url);
//   // await new Email(newUser, url).sendWelcome();

//   createSendToken(newUser, 201, res);
// });


exports.signUpAdmin = catchAsync(async (req, res, next) => {
  // console.log("Request Body:", req.body);

 if (req.body.role === 'admin') {
    if (req.body.adminKey !== process.env.ADMIN_KEY) {
      return next(
        new AppError('Invalid admin key. Not authorized to sign up as admin.', 403)
      );
    }
  }

  const newUser = await User.create({
    role: 'admin',
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    phone: req.body.phone,
    address: req.body.address,
    organizationName: req.body.organizationName,
    registrationNumber: req.body.registrationNumber,
  });

  const url = `${req.protocol}://${req
    .get("host")
    .replace("127.0.0.1", "localhost")}/me`;
  console.log(url);
  // await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});


exports.signUpVolunteer = catchAsync(async (req, res, next) => {
  // console.log("Request Body:", req.body);
  const newUser = await User.create({
    role:'volunteer',
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    phone: req.body.phone,
    address: req.body.address,
    transportMode:req.body.transportMode,
    availability:req.body.availability,
  });

  const url = `${req.protocol}://${req
    .get("host")
    .replace("127.0.0.1", "localhost")}/me`;
  console.log(url);
  // await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});


exports.signUpDonor = catchAsync(async (req, res, next) => {
  // console.log("Request Body:", req.body);

  const newUser = await User.create({
    role: 'donor',
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    phone: req.body.phone,
    address: req.body.address,
    transportMode:req.body.transportMode,
    availability:req.body.availability,
    organizationName: req.body.organizationName,
    registrationNumber: req.body.registrationNumber,
  });

  const url = `${req.protocol}://${req
    .get("host")
    .replace("127.0.0.1", "localhost")}/me`;
  console.log(url);
  // await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});




exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const requestedRole=req.role;
  if (!email || !password) {
    return next(new AppError("Please Provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

if (user.role !== requestedRole) {
    return next(new AppError(`Access denied. This is not a ${requestedRole} account.`, 403));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log("This is tiken : ",token);

  if (!token) {
    return next(
      new AppError("You are not logged in !. Please log in to get access.", 401)
    );
  }

  //2) Verification token
  // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(
      new AppError('You are not logged in!. Please log in again!', 401)
    );
  }

  //console.log(decoded);

  //3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError(
        "The User belonging to this token does no longer exist !",
        401
      )
    );

  //4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User recently changed the Password!. Please log in again",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  console.log(req.user);
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      //2) Verification token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );
      //console.log(decoded);

      //3) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();

      //4) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // The user is logged in
      res.locals.user = currentUser;
      console.log(req.user);
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
    message:"Logged out successfully"
  });
};


exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles  ['admin','donor','volunteer'].role='user'
     console.log("restrictTo: current role =>", req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You dont have permission to perform this action', 403),
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with this email address.', 404));
  }

  //2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3) Send it to user's email
  // const message = `Forgot your password? Submit PATCH request with your password and passwordConfirm to: ${resetURL}.\nIf you didn't forgot your password please ignore this email`;

  try {
    // await sendEmail({
    //   email: user.email,
    //   subject: 'Your password reset toke (Valid for 10 min)',
    //   message,
    // });
     let rolePath = '';
  if (user.role === 'admin') rolePath = 'admins';
  else if (user.role === 'volunteer') rolePath = 'volunteers';
  else if (user.role === 'donor') rolePath = 'donors';

    const resetURL = `${req.protocol}://${req
      .get('host')
      .replace(
        '127.0.0.1',
        'localhost',
      )}/api/v1/${rolePath}/resetPassword/${resetToken}`;
    // await new Email(user, resetURL).sendpasswordReset();

    console.log(resetURL);

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
    next();
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError('There was an error sending the email. Try again later !'),
      500,
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //3) Update changedPasswordAt property for the user

  //4) Log the user in, send JWT
  // const token = signToken(user._id);
  // res.status(200).json({
  //   status: 'Success',
  //   token,
  // });
  createSendToken(user, 200, res);
  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1) Get user from the collection
  const user = await User.findById(req.user.id).select('+password');

  //2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current Password is wrong', 400));
  }

  //3) If so, update password
  console.log("This is password",user.password);
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //4)Log user in, send JWT
  createSendToken(user, 200, res);
});



