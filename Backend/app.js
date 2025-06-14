console.log("Hello from the server side!");
const express = require("express");
const cors = require("cors");
const cookieParser=require("cookie-parser");
const AppError=require("./utils/appError");
const path=require("path");


const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'public')));

const userRouter=require("./routes/userRoutes");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users",userRouter);

module.exports = app;
