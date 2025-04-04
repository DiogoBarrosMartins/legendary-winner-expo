import React from 'react';
import { ScrollView, StyleSheet, Platform, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { DiscordWidget } from './DiscordWidget';


export function GameOverview() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Faction Wars: A Dynamic MMO Strategy Game</ThemedText>
      <ThemedText style={styles.paragraph}>
        Faction Wars is a strategy MMO where players engage in faction-driven territorial battles, resource management, and large-scale PvP/PvE interactions. The game emphasizes player collaboration, emergent strategy, and dynamic world evolution.
      </ThemedText>

      <ThemedText type="subtitle" style={styles.subtitle}>Core Features</ThemedText>
      <ThemedText style={styles.paragraph}>
        <ThemedText type="defaultSemiBold">Map & Hex Tile System:</ThemedText> A vast virtual world made of (q, r) coordinate tiles featuring player villages, faction cities, PvP zones, and shrines.
      </ThemedText>
      <ThemedText style={styles.paragraph}>
        <ThemedText type="defaultSemiBold">Faction Gameplay:</ThemedText> Engage in territorial conflict with outposts, reinforcement bonuses, and PvP zones that drive emergent strategy.
      </ThemedText>
      <ThemedText style={styles.paragraph}>
        <ThemedText type="defaultSemiBold">Leadership & Governance:</ThemedText> Elected faction leaders, shared responsibilities, and failsafe voting mechanisms keep gameplay fair.
      </ThemedText>
      <ThemedText style={styles.paragraph}>
        <ThemedText type="defaultSemiBold">World Dynamics:</ThemedText> Dynamic power scales, faction-specific shrines, and evolving neutral zones create a living game world.
      </ThemedText>

      <ThemedText type="subtitle" style={styles.subtitle}>Gameplay Flow</ThemedText>
      <ThemedText style={styles.paragraph}>
        Early game: Establish your village near your faction's capital. Mid game: Expand into contested zones and outposts. Late game: Engage in massive faction wars over the Hearthlands.
      </ThemedText>

      {/* Discord Integration */}
      <ThemedText type="subtitle" style={styles.subtitle}>Join Our Faction Discord</ThemedText>
      <DiscordWidget />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  paragraph: {
    marginVertical: 8,
    fontSize: 16,
    lineHeight: 22,
  },
  subtitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
