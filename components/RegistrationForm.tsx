import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios'; // Make sure axios is installed with `npm install axios`



const tribeDescriptions: Record<string, string> = {
  humans: "Humans: Balanced stats. Some say the strongest race. Known for their Knights and Archers.",
  orcs: "Orcs: High strength, low intelligence. Fear their Berserkers and Warlords.",
  elves: "Elves: High intelligence, low strength. Their Mages and Archers are legendary.",
};

export function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tribe, setTribe] = useState<string | undefined>(undefined);

  const handleRegister = async () => {
    if (!username || !email || !password || !tribe) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users', {
        username,
        email,
        password,
        isActive: true,
        refreshToken: '',
        resetToken: '',
        raceId: 1, // Assuming tribe maps to raceId
      });

      Alert.alert('Success', 'User registered successfully!');
      console.log('User registered:', response.data);
      // Reset form after successful registration
      setUsername('');
      setEmail('');
      setPassword('');
      setTribe(undefined);
    } catch (error:any ) {
      console.error('Registration error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to register user');
    }
  };

  return (
    <View style={styles.registerForm}>
      <Text style={styles.formTitle}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.tribeSelection}>
        {['humans', 'orcs', 'elves'].map((tribeKey) => (
          <TouchableOpacity
            key={tribeKey}
            style={[
              styles.tribeCard,
              tribe === tribeKey ? styles.selectedTribe : {},
            ]}
            onPress={() => setTribe(tribeKey)}
          >
            <Text>{tribeDescriptions[tribeKey]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerBtnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  registerForm: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  tribeSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tribeCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  selectedTribe: {
    borderColor: '#007bff',
  },
  tribeImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  registerBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
