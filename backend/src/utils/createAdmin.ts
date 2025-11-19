import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/talenthub');
    console.log('Connected to MongoDB');

    const existingUser = await User.findOne({ email: 'keltoummalouki@gmail.com' });
    
    if (existingUser) {
      console.log('Admin already exists, updating password...');
      const hashedPassword = await bcrypt.hash('password1234', 10);
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log('✅ Admin password updated successfully');
    } else {
      const hashedPassword = await bcrypt.hash('password1234', 10);
      
      await User.create({
        username: 'keltoummalouki',
        email: 'keltoummalouki@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      console.log('✅ Admin user created successfully');
      console.log('Email: keltoummalouki@gmail.com');
      console.log('Password: password1234');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
