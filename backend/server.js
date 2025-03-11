require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./controllers/authController');
const courseRoutes = require('./controllers/courseController');
const paymentRoutes = require('./controllers/paymentController');
const errorMiddleware = require('./middleware/error');

const app = express();

// Middlewares de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com o MongoDB
connectDB();

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payment', paymentRoutes);

// Middleware de tratamento de erros
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
