import React from 'react';
import { version } from 'expo/package.json';
import { Image } from 'expo-image';
import { StyleSheet, useColorScheme } from 'react-native';

import { Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function WebBadge() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="code" themeColor="textSecondary" style={styles.version}>
        v{version}
      </ThemedText>
      <Image
        source={
          colorScheme === 'dark'
            ? require('@/assets/images/expo-badge-white.png')
            : require('@/assets/images/expo-badge.png')
        }
        style={styles.badge}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.two,
  },
  version: {
    textAlign: 'center',
  },
  badge: {
    width: 123,
    aspectRatio: 123 / 24,
  },
});