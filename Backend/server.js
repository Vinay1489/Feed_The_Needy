const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./app");
const port = 3000;

// Socket.IO setup
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Listen for client connections
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // When a volunteer sends a location update
  socket.on("volunteerLocationUpdate", (data) => {
    // data = { volunteerId, lat, lng }
    console.log("Location update:", data);

    // Broadcast to all connected clients
    io.emit("volunteerLocationBroadcast", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  encodeURIComponent(process.env.DATABASE_PASSWORD)
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true,
  })
  .then(() => {
    console.log("DB connection is successful");
  })
  .catch((err) => {
    console.log("Error in connecting " + err);
  });

  app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from the server side!!", app: "Food-dist" });
});

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});










