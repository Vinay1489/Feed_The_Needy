const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}.`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.email}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid Input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid Token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired!. Please log in again.", 401);

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  console.log(`ERROR 💥`, err);
  return res.status(err.statusCode).json({
    status: err.status,
    title: "Something went wrong",
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    console.log(`ERROR 💥`, err);
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }

  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).json({
      status: err.status,
      title: "Something went wrong",
      msg: err.message,
    });
  }

  console.log(`ERROR 💥`, err);
  return res.status(err.statusCode).json({
    status: err.status,
    title: "Something went wrong",
    msg: "Please try again later",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = JSON.parse(JSON.stringify(err));
    error.message = err.message;
    console.log(error);
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};

// const AppError = require('../utils/appError');

// const handleCastErrorDB = (err) => {
//   const message = `Invalid ${err.path}:${err.value}.`;
//   return new AppError(message, 400);
// };
// const handleDuplicateFieldsDB = (err) => {
//   //console.log(err.keyValue.name);
//   //const value=err.message.match(/(["'])(\\?.)*?\1/);
//   //console.log(value);
//   const message = `Duplicate field value: ${err.keyValue.email}. Please use another value`;
//   return new AppError(message, 400);
// };

// const handleValidationError = (err) => {
//   const errors = Object.values(err.errors).map((el) => el.message);
//   const message = `Invalid Input data. ${errors.join('. ')}`;
//   return new AppError(message, 400);
// };

// const handleJWTError = () =>
//   new AppError('Invalid Token. Please log in again!', 401);

// const handleJWTExpiredError = () =>
//   new AppError('Your token has expired!. Please log in again.', 401);

// const sendErrorDev = (err,req, res) => {
//   // A) API
//   if(req.originalUrl.startsWith('/api')){
//   return res.status(err.statusCode).json({
//     status: err.status,
//     error: err,
//     message: err.message,
//     stack: err.stack,
//   });
// }
//   // B) RENDERED WEBSITE
//   console.log(`ERROR 💥`, err);
//   return res.status(err.statusCode).render('error',{
//     title:"Something went wrong",
//     msg:err.message,
//   })
// };

// const sendErrorProd = (err,req, res) => {
//   // A) API
//   if(req.originalUrl.startsWith("/api"))
//   {
// // A) Operational trusted error: message sent to client
//     if (err.isOperational) {
//       return res.status(err.statusCode).json({
//         status: err.status,
//         message: err.message,
//       });
//     }
//     //  B) Programming or other unknown error: don't leak error details
//       // 1) Log error
//       console.log(`ERROR 💥`, err);
//        // 2) Send generic message
//      return res.status(500).json({
//         status: 'error',
//         message: 'Something went very wrong!',
//       });
//   }

//   // B) RENDERING WEBSITE
//         // A) Operational trusted error: message sent to client
//     if (err.isOperational) {
//       console.log(err);
//      return res.status(err.statusCode).render('error',{
//         title:"Something went wrong",
//         msg:err.message,
//       })
//     }
//     // B) Programming or other unknown error: don't leak error details
//       // 1) Log error
//       console.log(`ERROR 💥`, err);

//       // 2) Send generic message
//       return res.status(err.statusCode).render('error',{
//         title:"Something went wrong",
//         msg:"Please try again later",
//       })
// };

// module.exports = (err, req, res, next) => {
//   //console.log(err.stack);
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';
//   if (process.env.NODE_ENV === 'development') {
//     sendErrorDev(err,req, res);
//   } else if (process.env.NODE_ENV === 'production') {
//     // Actually we can use shallow copy here ....i.e; let error={ ...err }....But it is not working in my system for some reason..
//     //So  I have used deep copy instead of shallow copy here
//     let error = JSON.parse(JSON.stringify(err));
//     error.message=err.message;
//     console.log(error);
//     if (error.name === 'CastError') error = handleCastErrorDB(error);
//     if (error.code === 11000) error = handleDuplicateFieldsDB(error);
//     if (error.name === 'ValidationError') error = handleValidationError(error);
//     if (error.name === 'JsonWebTokenError') error = handleJWTError();
//     if (error.name === 'TokenExpiredError')
//       error = handleJWTExpiredError();
//     sendErrorProd(error,req, res);
//   }
//   //next();
// };

