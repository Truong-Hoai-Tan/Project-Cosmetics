const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://truonghoaitan:Th180903@cluster0.5zshk1a.mongodb.net/demo_abc');

    console.log('connect db thanh cong');
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = connectDB;
