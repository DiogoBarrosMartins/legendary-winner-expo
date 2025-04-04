import React from 'react';
import { Platform, View, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';

export function DiscordWidget() {
  const discordInviteURL = "https://discord.gg/YOUR_INVITE_CODE"; // Replace with your invite link

  // On web, show the Discord widget iframe.
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <iframe
          src="https://discord.com/widget?id=YOUR_SERVER_ID&theme=dark"
          width="350"
          height="500"
          allowTransparency={true}
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          style={styles.iframe}
        ></iframe>
      </View>
    );
  }

  // On native, show a button to open Discord.
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(discordInviteURL)}>
        <Text style={styles.buttonText}>Join Our Discord</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iframe: {
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#7289da',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
