import { DefaultTheme } from '@react-navigation/native';

export const colors = {
  background: '#191919',
  white: '#ffffff',
  black: '#242424',
  grey: '#b9b9b9',
  darkGrey: '#434343',
  main: '#9b84f7',
  point: '#8c70ff',
  error: '#f34f45',
  green: '#5FA65E',
  lavender: '#EDE9FF',
  lightGreen: '#73FFB3',
};

export const fonts = {
  bold: 'Pretendard-Bold',
  semibold: 'Pretendard-SemiBold',
  medium: 'Pretendard-Medium',
  regular: 'Pretendard-Regular',
  light: 'Pretendard-Light',
};

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    border: 'transparent',
  },
};
