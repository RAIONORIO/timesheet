import React from 'react';
import type { LogEntry } from '../types';
import { formatMinutes } from '../utils/time';
import { TrashIcon } from './icons/TrashIcon';

interface DailyLogsProps {
  logs: LogEntry[];
  onDeleteLog: (logId: string) => void;
}

const DailyLogs: React.FC<DailyLogsProps> = ({ logs, onDeleteLog }) => {
  const sortedLogs = [...logs].sort((a, b) => b.id.localeCompare(a.id));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-700">Registros Diários</h2>
      {sortedLogs.length === 0 ? (
        <p className="text-slate-500 text-center py-4">Nenhum tempo registrado para este mês ainda.</p>
      ) : (
        <div className="flow-root">
          <ul role="list" className="-my-4 divide-y divide-slate-200">
            {sortedLogs.map((log) => {
               const date = new Date(log.id + 'T00:00:00');
               const formattedDate = date.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
               });

              return (
              <li key={log.id} className="flex items-center justify-between py-4">
                <div className="flex-grow">
                  <p className="font-medium text-slate-800">{formattedDate}</p>
                  <p className="text-slate-500 text-sm">{formatMinutes(log.minutes)} horas</p>
                </div>
                <button
                  onClick={() => onDeleteLog(log.id)}
                  className="p-2 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                  aria-label={`Excluir registro de ${formattedDate}`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </li>
            )})}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DailyLogs;