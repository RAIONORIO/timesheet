import React from 'react';
import { Goal } from '../types';

interface GoalSelectorProps {
  selectedGoal: Goal;
  onGoalChange: (goal: Goal) => void;
}

const GoalOption: React.FC<{
  value: Goal,
  label: string,
  description: string,
  isSelected: boolean,
  onChange: (value: Goal) => void
}> = ({ value, label, description, isSelected, onChange }) => (
  <label
    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
      isSelected
        ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
        : 'bg-white border-slate-300 hover:border-blue-400'
    }`}
  >
    <input
      type="radio"
      name="goal"
      value={value}
      checked={isSelected}
      onChange={() => onChange(value)}
      className="sr-only"
    />
    <div>
      <span className="font-semibold text-lg">{label}</span>
      <p className={`text-sm ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>{description}</p>
    </div>
  </label>
);

const GoalSelector: React.FC<GoalSelectorProps> = ({ selectedGoal, onGoalChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-700">Meu Alvo</h2>
      <div className="space-y-3">
        <GoalOption
          value={Goal.AUXILIARY}
          label="Auxiliar"
          description="30 horas / mês"
          isSelected={selectedGoal === Goal.AUXILIARY}
          onChange={onGoalChange}
        />
        <GoalOption
          value={Goal.REGULAR}
          label="Regular"
          description="50 horas / mês"
          isSelected={selectedGoal === Goal.REGULAR}
          onChange={onGoalChange}
        />
      </div>
    </div>
  );
};

export default GoalSelector;