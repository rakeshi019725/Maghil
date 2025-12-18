import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

const CreateTaskScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const save = () => {
    if (!title || !amount) {
      Alert.alert('Validation', 'All fields required');
      return;
    }

    dispatch(
      addTask({
        id: Date.now().toString(),
        title,
        amount: Number(amount),
        createdAt: new Date().toISOString(),
        syncStatus: 'PENDING',
      })
    );

    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Save Task" onPress={save} />
    </View>
  );
};

export default CreateTaskScreen;
