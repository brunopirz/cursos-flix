import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/member-area'; // redireciona para a área de membros
    } catch (err) {
      setError(err.response.data.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>
        {error && <div className="bg-red-200 text-red-800 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
          >
            Entrar
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Esqueci minha senha
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
