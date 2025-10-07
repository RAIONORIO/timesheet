
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { LogEntry } from './types';
import { Goal } from './types';
import { storageService } from './services/storageService';
import Header from './components/Header';
import GoalSelector from './components/GoalSelector';
import MonthlySummary from './components/MonthlySummary';
import TimeLogger from './components/TimeLogger';
import DailyLogs from './components/DailyLogs';
import { formatMinutes } from './utils/time';

const App: React.FC = () => {
  const [goal, setGoal] = useState<Goal>(Goal.REGULAR);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate] = useState(new Date());

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [storedGoal, storedLogs] = await Promise.all([
        storageService.getGoal(),
        storageService.getLogsForMonth(currentDate.getFullYear(), currentDate.getMonth()),
      ]);
      setGoal(storedGoal);
      setLogs(storedLogs);
    } catch (error) {
      console.error("Failed to load data:", error);
      // Handle error display to the user if necessary
    } finally {
      setLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleGoalChange = async (newGoal: Goal) => {
    await storageService.setGoal(newGoal);
    setGoal(newGoal);
  };

  const handleTimeLog = async (date: string, minutes: number) => {
    await storageService.addTimeToLog(date, minutes);
    fetchAllData(); // Refetch to get updated logs
  };

  const handleDeleteLog = async (logId: string) => {
    await storageService.deleteLog(logId);
    fetchAllData(); // Refetch to get updated logs
  };

  const totalMinutes = useMemo(() => {
    return logs.reduce((total, log) => total + log.minutes, 0);
  }, [logs]);

  const remainingMinutes = useMemo(() => {
    const goalMinutes = goal * 60;
    return Math.max(0, goalMinutes - totalMinutes);
  }, [totalMinutes, goal]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <GoalSelector selectedGoal={goal} onGoalChange={handleGoalChange} />
              <MonthlySummary
                totalTime={formatMinutes(totalMinutes)}
                remainingTime={formatMinutes(remainingMinutes)}
                goal={goal}
              />
            </div>
            <div className="md:col-span-2 space-y-6">
              <TimeLogger onTimeLog={handleTimeLog} />
              <DailyLogs logs={logs} onDeleteLog={handleDeleteLog} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
