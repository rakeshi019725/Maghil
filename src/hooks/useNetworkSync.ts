import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '../features/tasks/tasksSlice';
import { syncTaskToServer } from '../services/syncService';
import { Task } from '../features/tasks/tasksTypes';

export const useNetworkSync = (tasks: Task[]) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        tasks.forEach(async task => {
          if (task.syncStatus === 'PENDING') {
            try {
              await syncTaskToServer(task);
              dispatch(updateTaskStatus({ id: task.id, status: 'SYNCED' }));
            } catch {
              dispatch(updateTaskStatus({ id: task.id, status: 'FAILED' }));
            }
          }
        });
      }
    });

    return () => unsubscribe();
  }, [tasks]);
};
