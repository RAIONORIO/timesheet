import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto max-w-4xl px-4 py-4 md:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
          Controle de Horas Pioneiro
        </h1>
        <p className="text-slate-500 mt-1">Seu controle de serviço mensal.</p>
      </div>
    </header>
  );
};

export default Header;