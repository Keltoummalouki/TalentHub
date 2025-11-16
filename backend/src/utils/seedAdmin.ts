import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import logger from '../logger/logger.js';

export const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'keltoummalouki@gmail.com' });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('password1234', 10);
      
      await User.create({
        username: 'keltoummalouki',
        email: 'keltoummalouki@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      logger.info('Admin user created: email=keltoummalouki@gmail.com, password=password1234');
    }
  } catch (error) {
    logger.error('Error seeding admin:', error);
  }
};
