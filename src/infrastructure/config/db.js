const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error("DB error:", err.message);
  }
}

module.exports = connectDB;
