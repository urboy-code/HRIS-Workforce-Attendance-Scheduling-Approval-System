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

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        position: true,
        created_at: true,
      },
    });
    res.json({ data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ messasge: 'Failed to get user data' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, position } = req.body;

    let updateData = { name, email, role, position };

    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      updateData.password = hashPassword;
    }

    const updateUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    const { password: _, ...userData } = updateUser;

    res.json({
      message: 'Update success',
      data: userData,
    });
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ message: 'User id Not Found' });
    }
    res.status(500).json({ message: 'Failed to Update' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Delete success.' });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'User ID are Not Found' });
    }
    res.status(500).json({ message: 'Failed to Delete user' });
  }
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser };
