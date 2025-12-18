import React, { useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { loadTasks, saveTasks } from '../utils/storage';
import { formatDate } from '../utils/date';
import { setTasks, updateTaskStatus } from '../features/tasks/tasksSlice';
import { useNetworkSync } from '../hooks/useNetworkSync';
import { syncTaskToServer } from '../services/syncService';

const TaskListScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    useNetworkSync(tasks);

    useEffect(() => {
        loadTasks().then(data => dispatch(setTasks(data)));
    }, []);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const retry = async (task: any) => {
        try {
            await syncTaskToServer(task);
            dispatch(updateTaskStatus({ id: task.id, status: 'SYNCED' }));
        } catch {
            dispatch(updateTaskStatus({ id: task.id, status: 'FAILED' }));
        }
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Button title="Create Task" onPress={() => navigation.navigate('CreateTask')} />

            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    console.log(item, '1111datas')
                    return (
                        <View style={{ padding: 12, marginVertical: 8, borderWidth: 1 }}>
                            <Text>Title: {item.title}</Text>
                            <Text>Amount: ₹{item.amount}</Text>
                            <Text>Created: {formatDate(item.createdAt)}</Text>
                            <Text>Status: {item.syncStatus}</Text>
                            {item.syncStatus === 'FAILED' && (
                                <Button title="Retry Sync" onPress={() => retry(item)} />
                            )}
                        </View>
                    )
                }
                }
            />
        </View>
    );
};

export default TaskListScreen;
