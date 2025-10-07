
export enum Goal {
  AUXILIARY = 30,
  REGULAR = 50,
}

export interface LogEntry {
  id: string; // Format: 'YYYY-MM-DD'
  minutes: number;
}
