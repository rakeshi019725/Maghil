import { Task } from '../features/tasks/tasksTypes';

export const syncTaskToServer = (task: Task) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.2 ? resolve() : reject();
    }, 1000);
  });
};
