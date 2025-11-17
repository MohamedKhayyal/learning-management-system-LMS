const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db.config");
const AppError = require("./utilts/AppError");
const errorHandler = require("./middlewares/errorHandler");
const corsHandler = require("./middlewares/corsHandler");

const authRoute = require("./routes/authRoute");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(`${err.name}: ${err.message}`);
  console.log(err.stack);
  process.exit(1);
});

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(corsHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/img", express.static(path.join(__dirname, "uploads")));

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoute);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
