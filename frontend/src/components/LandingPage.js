// frontend/src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fundo com vídeo (pode ser substituído por um carrossel de imagens) */}
      <div className="absolute inset-0">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/videos/background.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Conteúdo da Landing Page */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <img src="/images/logo.png" alt="Cursos Flix Logo" className="w-48 mb-8 animate-fade-in"/>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Transforme seu futuro com o Cursos Flix!</h1>
        <p className="text-xl md:text-2xl mb-8">
          Acesso ilimitado a milhares de cursos online por apenas R$ 47/mês. Assine agora e comece a aprender!
        </p>
        <Link
          to="/signup"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full mb-4 animate-pulse"
        >
          Experimente grátis por 7 dias
        </Link>
        <div className="flex space-x-4">
          <Link to="/signup" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Assinar Agora
          </Link>
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Entrar
          </Link>
        </div>
        <p className="mt-8 text-sm">
          Cursos novos toda semana | Aprenda no seu ritmo | Assista onde e quando quiser
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
