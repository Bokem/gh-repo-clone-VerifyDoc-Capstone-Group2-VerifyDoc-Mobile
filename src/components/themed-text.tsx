import { Platform, StyleSheet, Text, useColorScheme, type TextProps } from 'react-native';

import { Colors, Fonts, type ThemeColor } from '@/constants/theme';
import React from 'react';

type TextType = 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';

export type ThemedTextProps = TextProps & {
  type?: TextType;
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor = 'text', ...props }: ThemedTextProps) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';

  return (
    <Text
      style={[{ color: Colors[colorScheme][themeColor] }, styles[type], style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  title: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: '600',
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: '600',
  },
  link: {
    fontSize: 14,
    lineHeight: 30,
  },
  linkPrimary: {
    fontSize: 14,
    lineHeight: 30,
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: '700' }) ?? '500',
    fontSize: 12,
  },
});