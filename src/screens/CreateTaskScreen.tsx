import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

const CreateTaskScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const isValidAmount = (value: string) => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  };

  const save = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Title is required');
      return;
    }

    if (!amount.trim()) {
      Alert.alert('Validation Error', 'Amount is required');
      return;
    }

    if (!isValidAmount(amount)) {
      Alert.alert(
        'Validation Error',
        'Amount must be a valid positive number'
      );
      return;
    }

    dispatch(
      addTask({
        id: Date.now().toString(),
        title: title.trim(),
        amount: Number(amount),
        createdAt: new Date().toISOString(),
        syncStatus: 'PENDING',
      })
    );

    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

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
