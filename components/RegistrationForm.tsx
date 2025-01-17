import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import axios from 'axios';

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
  
    try {
      // Send the registration data to the backend
      const response = await axios.post("http://10.0.2.2:3000/users", {  // Adjust the URL
        username,
        email,
        password,
        isActive: true,  // Optional, set to true by default
        refreshToken: "",  // Optional, leave empty for now
        resetToken: "",  // Optional, leave empty if not used
        raceId: 1,  // Optional, pass if applicable
      });
  
      // Handle successful registration
      Alert.alert("Success", "User registered successfully!");
      console.log('User registered successfully:', response.data);
  
      // Clear the form fields after registration
      setUsername('');
      setEmail('');
      setPassword('');
  
      // Optionally, you can navigate the user to another screen after successful registration.
      // navigation.navigate('Login');
    } catch (error: any) {
      console.error("Registration error:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to register user");
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

      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerBtnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  registerForm: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  registerBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  registerBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
