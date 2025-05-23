const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://mruban:Allomiro232730@mariya.wurif.mongodb.net/?retryWrites=true&w=majority&appName=Mariya";

const connectDB = async () => {
   try {
       await mongoose.connect(mongoURI);
       console.log('MongoDB connected successfully');
   } catch (err) {
       console.error('Database connection failed:', err);
   }
};

module.exports = connectDB;