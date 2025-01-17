import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { RegisterForm } from "@/components/RegistrationForm";  // Import the RegisterForm component

export default function Register() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>
      <RegisterForm /> {/* Render the RegisterForm component */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
