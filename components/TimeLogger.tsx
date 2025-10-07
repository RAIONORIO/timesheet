import React, { useState } from 'react';
import { parseTimeInput } from '../utils/time';

interface TimeLoggerProps {
  onTimeLog: (date: string, minutes: number) => void;
}

const TimeLogger: React.FC<TimeLoggerProps> = ({ onTimeLog }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeInput, setTimeInput] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const minutes = parseTimeInput(timeInput);

    if (minutes === null || minutes <= 0) {
      setError("Por favor, insira um tempo válido. Use formatos como '2', '2:30' ou '1,5'.");
      return;
    }
    
    if (!date) {
        setError("Por favor, selecione uma data.");
        return;
    }

    onTimeLog(date, minutes);
    setSuccessMessage(`Adicionado ${timeInput} horas com sucesso para ${new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')}.`);
    setTimeInput('');

    // Limpar mensagem de sucesso após alguns segundos
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-700">Registrar Meu Tempo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-600 mb-1">
              Data
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-slate-600 mb-1">
              Horas (ex: 2:30)
            </label>
            <input
              type="text"
              id="time"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              placeholder="ex: 2 ou 1,5"
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}
        {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Adicionar Tempo
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimeLogger;