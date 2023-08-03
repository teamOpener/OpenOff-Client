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
  textContainer: {
    marginTop: 26,
    paddingHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 2,
  },
  contentsText: {
    fontFamily: fonts.semibold,
    fontSize: 13,
  } as TextStyle,
  buttonContainer: {
    paddingVertical: 9,
    paddingHorizontal: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
    borderRadius: 25,
  },
});

export default commonDialogStyles;
