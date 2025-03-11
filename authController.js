// backend/controllers/authController.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registro de usuário
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if(user) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }
    user = new User({ firstName, lastName, email, password });
    await user.save();
    // Aqui, você pode implementar o envio de e-mail de confirmação
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no registro do usuário' });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no login' });
  }
});

// Endpoint para recuperação de senha (implementação a ser adicionada)

module.exports = router;
