console.log("Hello from the server side!");
const express = require("express");
const cors = require("cors");

const app = express();


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

module.exports = app;
