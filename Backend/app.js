console.log("Hello from the server side!");
const express = require("express");
const cors = require("cors");
const cookieParser=require("cookie-parser");
const AppError=require("./utils/appError");
const path=require("path");
const globalErrorHandler=require("./controllers/errorController");


const app = express();


// Configure CORS to support multiple environments
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests or same-origin with no origin header
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'public')));

const userRouter=require("./routes/userRoutes");
const adminRouter=require("./routes/adminRoutes");
const volunteerRouter=require("./routes/volunteerRoutes");
const donorRouter=require("./routes/donorRoutes");
const foodRouter=require("./routes/foodRoutes");


app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/admins",adminRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/volunteers",volunteerRouter);
app.use("/api/v1/donors",donorRouter);

app.use("/api/v1/food",foodRouter);


app.all(`*`, (req, res, next) => {
  // const err=new Error(`Can't find the ${req.originalUrl} in the server!`);
  // err.status="fail";
  // err.statusCode=404;
  // next(err);

  next(new AppError(`Can't find the ${req.originalUrl} in the server!`, 404));
});

app.use(globalErrorHandler);


module.exports = app;
