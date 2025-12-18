import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../features/tasks/tasksTypes';

const KEY = 'TASKS';

export const saveTasks = async (tasks: Task[]) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
};

export const loadTasks = async (): Promise<Task[]> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};
