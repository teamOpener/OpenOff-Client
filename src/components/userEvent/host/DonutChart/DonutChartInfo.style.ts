import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const donutChartInfoStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  donutContainer: {
    padding: 13,
  },
  donutInnerTextWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  donutTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  numeratorText: {
    fontFamily: fonts.semibold,
    fontSize: 30,
  } as TextStyle,
  denominatorText: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 28,
  } as TextStyle,
  labelText: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    lineHeight: 23.8,
  } as TextStyle,
});

export default donutChartInfoStyles;
