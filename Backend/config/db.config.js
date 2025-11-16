const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.CONNECTION_STRING;
  const dbName = process.env.DB_NAME;

  if (!uri) {
    console.error("ERROR: CONNECTION_STRING is not defined in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      dbName,
    });

    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("Database connection error:");
    console.error(err.message);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB Connection Error: ", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB Disconnected");
  });
};

module.exports = connectDB;

// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.CONNECTION_STRING);
//         console.log('MongoDB Connected');
//     } catch (err) {
//         console.log(`Database connection error: ${err.message}`);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
