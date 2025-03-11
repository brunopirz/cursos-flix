import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validação de senha forte
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/;

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Limpa erro ao digitar
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validação de campos
    if (!firstName || !lastName || !email || !password) {
      setError('Todos os campos são obrigatórios');
      setIsSubmitting(false);
      return;
    }

    // Validação de senha
    if (!passwordRegex.test(password)) {
      setError('A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.post('/api/auth/register', formData);
      setSuccess('Cadastro realizado com sucesso! Verifique seu e-mail para confirmação');
      setError('');
      // Redirecionamento após cadastro
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro no cadastro');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastre-se</h2>
        
        {error && (
          <div className="bg-red-200 text-red-800 p-2 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-200 text-green-800 p-2 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Seu nome"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Sobrenome</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Seu sobrenome"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Sua senha"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded cursor-pointer disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
