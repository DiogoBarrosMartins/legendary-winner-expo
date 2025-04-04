import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { GameOverview } from '@/components/GameOverview';
import { Chat } from '@/components/Chat';

export default function HomeScreen() {
  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <GameOverview />
      <View style={styles.chatWrapper}>
        <Chat currentUser="Esp" onLogout={handleLogout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#111',
  },
  chatWrapper: {
    marginTop: 20,
    height: 400, // Fixed chat height
    width: '100%',
    borderWidth: 2,
    borderColor: 'red', // Debug border to verify dimensions
  },
});
