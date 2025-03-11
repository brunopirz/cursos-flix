// cursos-flix-frontend/src/components/Signup.js
import React from 'react';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastre-se</h2>
        {/* Aqui você pode adicionar o formulário de cadastro */}
        <form>
          <input
            type="text"
            placeholder="Nome"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Sobrenome"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
