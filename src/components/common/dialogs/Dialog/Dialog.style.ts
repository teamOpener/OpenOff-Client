import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';
import dialogStyles from '../dialogStyle';

const commonDialogStyles = StyleSheet.create({
  ...dialogStyles,
  typeShow: {
    position: 'absolute',
    top: -41,
    width: 83,
    height: 83,
    borderRadius: 300,
    backgroundColor: colors.darkGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 69,
    height: 69,
    borderRadius: 300,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  subTextContainer: {
    paddingTop: 20,
  },
  contentsText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    textAlign: 'center',
  } as TextStyle,
  buttonContainer: {
    paddingVertical: 9,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
    borderRadius: 25,
  },
});

export default commonDialogStyles;
