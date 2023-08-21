import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts, layouts } from 'styles/theme';

const commentInputStyles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
  },
  inputWrapper: {
    marginHorizontal: layouts.PADDING,
    marginBottom: 20,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.darkGrey,
    borderWidth: 1.5,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 8,
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
  },
  inputText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    flex: 1,
    color: colors.white,
  } as TextStyle,
  button: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 30,
    backgroundColor: colors.darkGrey,
  },
  activeButton: {
    backgroundColor: colors.main,
  },
  buttonText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
});

export default commentInputStyles;
