const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./app");
const port = 3000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection is successful");
  });

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from the server side!!", app: "Food-dist" });
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
