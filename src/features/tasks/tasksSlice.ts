import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './tasksTypes';

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.unshift(action.payload);
    },
    updateTaskStatus(
      state,
      action: PayloadAction<{ id: string; status: Task['syncStatus'] }>
    ) {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) task.syncStatus = action.payload.status;
    },
  },
});

export const { setTasks, addTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
