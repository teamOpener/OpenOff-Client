import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from './theme';

const textStyles = StyleSheet.create({
  h1: {
    fontFamily: fonts.semibold,
    fontSize: 25,
    lineHeight: 35,
  } as TextStyle,
  h2: {
    fontFamily: fonts.semibold,
    fontSize: 24,
    lineHeight: 33.6,
  } as TextStyle,
  h3: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 28,
  } as TextStyle,
  h4: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 25.2,
  } as TextStyle,
  body1: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 22.4,
  } as TextStyle,
  body2: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 19.6,
  } as TextStyle,
  caption: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 16.8,
  } as TextStyle,
  button1: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 28.8,
  } as TextStyle,
});

export default textStyles;
