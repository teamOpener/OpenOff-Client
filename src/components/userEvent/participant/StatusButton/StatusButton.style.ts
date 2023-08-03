import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const statusButtonStyles = StyleSheet.create({
  container: {
    height: 60, // text만 띄어져 있을 때와 동일하게 하고자 높이 고정
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  qrWrapper: {
    backgroundColor: colors.main,
    padding: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  qrText: {
    fontFamily: fonts.regular,
    fontSize: 10,
  } as TextStyle,
});

export default statusButtonStyles;
