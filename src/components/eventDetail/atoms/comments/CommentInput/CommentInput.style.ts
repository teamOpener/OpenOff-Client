import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const commentInputStyles = StyleSheet.create({
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.darkGrey,
    marginVertical: 10,
    borderWidth: 1.5,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 8,
    borderRadius: 8,
    flexDirection: 'row',
    zIndex: 1,
  },
  inputText: {
    width: '100%',
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
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    height: 15 * 1.4,
    alignSelf: 'center',
  } as TextStyle,
});

export default commentInputStyles;
