import * as bcrypt from 'bcrypt';

export const seedUsers = [
  {
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10), // Hashea la contraseña
    fullName: 'Admin User',
    roles: ['admin'],
  },
  {
    email: 'user@example.com',
    password: bcrypt.hashSync('user123', 10), // Hashea la contraseña
    fullName: 'Regular User',
    roles: ['user'],
  },
];