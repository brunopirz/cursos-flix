// backend/controllers/authController.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Registro de usuário
router.post('/register', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Verificação de campos básicos
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Verificação de formato de e-mail
    if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
      return res.status(400).json({ message: 'E-mail inválido' });
    }

    // Verificação de senha forte
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/.test(password)) {
      return res.status(400).json({
        message: 'A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial'
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    user = new User({ firstName, lastName, email, password });
    await user.save();
    
    // Remova ou altere a mensagem de confirmação conforme necessário
    res.status(201).json({ message: 'Usuário registrado com sucesso' });

  } catch (err) {
    next(err);
  }
});

// Login de usuário
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
      issuer: 'Cursos Flix'
    });

    res.json({ token });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
