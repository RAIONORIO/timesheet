import type { LogEntry } from '../types';
import { Goal } from '../types';

/**
 * NOTA: Este serviço usa localStorage para simular um backend persistente como o Firebase.
 * Para uma aplicação real, você substituiria estas funções por chamadas ao
 * Firebase/Firestore, autenticando o usuário anonimamente para persistir os dados entre dispositivos.
 */

const GOAL_KEY = 'pioneer-timesheet-goal';
const LOGS_KEY = 'pioneer-timesheet-logs';

const delay = <T,>(data: T): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), 200));

// Função auxiliar para obter todos os registros do armazenamento
const getAllLogs = (): Record<string, LogEntry> => {
  const logsJson = localStorage.getItem(LOGS_KEY);
  return logsJson ? JSON.parse(logsJson) : {};
};

// Função auxiliar para salvar todos os registros no armazenamento
const saveAllLogs = (logs: Record<string, LogEntry>): void => {
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
};

export const storageService = {
  async getGoal(): Promise<Goal> {
    const storedGoal = localStorage.getItem(GOAL_KEY);
    const goal = storedGoal ? (parseInt(storedGoal, 10) as Goal) : Goal.REGULAR;
    return delay(goal);
  },

  async setGoal(goal: Goal): Promise<void> {
    localStorage.setItem(GOAL_KEY, goal.toString());
    return delay(undefined);
  },

  async getLogsForMonth(year: number, month: number): Promise<LogEntry[]> {
    const allLogs = getAllLogs();
    const monthPrefix = `${year}-${(month + 1).toString().padStart(2, '0')}`;
    const monthLogs = Object.values(allLogs)
      .filter(log => log.id.startsWith(monthPrefix))
      .sort((a, b) => a.id.localeCompare(b.id)); // Ordenar por data
    return delay(monthLogs);
  },

  async addTimeToLog(date: string, minutes: number): Promise<void> {
    const allLogs = getAllLogs();
    const existingLog = allLogs[date];

    if (existingLog) {
      existingLog.minutes += minutes;
    } else {
      allLogs[date] = { id: date, minutes: minutes };
    }

    saveAllLogs(allLogs);
    return delay(undefined);
  },

  async deleteLog(logId: string): Promise<void> {
    const allLogs = getAllLogs();
    delete allLogs[logId];
    saveAllLogs(allLogs);
    return delay(undefined);
  },
};