import React from 'react';
import type { Goal } from '../types';

interface MonthlySummaryProps {
  totalTime: string;
  remainingTime: string;
  goal: Goal;
}

const SummaryCard: React.FC<{ title: string, time: string, isPrimary?: boolean }> = ({ title, time, isPrimary = false }) => (
    <div className={`p-4 rounded-lg ${isPrimary ? 'bg-blue-50' : 'bg-slate-100'}`}>
        <p className={`text-sm font-medium ${isPrimary ? 'text-blue-800' : 'text-slate-500'}`}>{title}</p>
        <p className={`text-2xl font-bold tracking-tight ${isPrimary ? 'text-blue-900' : 'text-slate-800'}`}>{time}</p>
    </div>
);


const MonthlySummary: React.FC<MonthlySummaryProps> = ({ totalTime, remainingTime, goal }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-700">Resumo Mensal</h2>
      <div className="space-y-3">
        <SummaryCard title="Total neste mês" time={totalTime} isPrimary />
        <SummaryCard title="Tempo restante" time={remainingTime} />
        <div className="text-center pt-2">
            <p className="text-sm text-slate-500">Alvo: <span className="font-semibold">{goal} horas</span></p>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;