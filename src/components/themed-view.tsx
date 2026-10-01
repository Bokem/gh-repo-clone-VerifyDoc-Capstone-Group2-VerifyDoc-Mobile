import React from 'react';
import { useColorScheme, View, type ViewProps } from 'react-native';

import { Colors, type ThemeColor } from '@/constants/theme';

export type ThemedViewProps = ViewProps & {
  type?: ThemeColor;
};

export function ThemedView({ style, type = 'background', ...props }: ThemedViewProps) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';

  return <View style={[{ backgroundColor: Colors[colorScheme][type] }, style]} {...props} />;
}