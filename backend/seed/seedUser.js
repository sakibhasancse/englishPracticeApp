import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';
dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const password = await bcrypt.hash('testpassword', 10);
  const user = new User({
    username: 'testuser',
    email: 'test@example.com',
    password
  });
  await user.save();
  console.log('Test user created:', user.email);
  mongoose.disconnect();
};

seed();
