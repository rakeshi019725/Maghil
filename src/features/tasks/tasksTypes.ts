export interface Task {
    id: string;
    title: string;
    amount: number;
    createdAt: string;
    syncStatus: 'PENDING' | 'SYNCED' | 'FAILED';
  }
  