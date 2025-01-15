import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

type RegistrationFormProps = {
  onCancel: () => void;
};

export function RegistrationForm({ onCancel }: RegistrationFormProps) {
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem('chatUsername') || '';
  });

  const handleSubmit = () => {
    console.log('Form submitted with username:', username);
    // Handle form submission logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />
      <View style={styles.buttonGroup}>
        <Button title="Create Account" onPress={handleSubmit} />
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 10,
    color: '#007bff',
    textAlign: 'center',
  },
});
