const prisma = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, position } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email has been used' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role,
        position,
      },
    });

    const { passowrd: _, ...userData } = newUser;

    res.status(201).json({
      message: 'User successfuly created',
      data: userData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Faild create user.',
    });
  }
};

module.exports = { createUser };
