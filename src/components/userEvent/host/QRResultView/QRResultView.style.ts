import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts, layouts } from 'styles/theme';

const qRResultViewStyles = StyleSheet.create({
  resultWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.main,
    position: 'absolute',
    bottom: 70,
    marginHorizontal: layouts.PADDING,
  },
  resultText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    textAlign: 'center',
  } as TextStyle,
});

export default qRResultViewStyles;
