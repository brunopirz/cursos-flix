// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./controllers/authController');
const courseRoutes = require('./controllers/courseController');
const paymentRoutes = require('./controllers/paymentController');

const app = express();

// Conexão com o MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
