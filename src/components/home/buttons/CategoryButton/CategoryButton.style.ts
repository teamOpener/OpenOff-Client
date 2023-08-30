import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const categoryButtonStyles = StyleSheet.create({
  centerDot: {
    textAlign: 'center',
    lineHeight: 6 * 1.4,
    fontSize: 6,
    fontFamily: fonts.bold,
  },
  buttonContainer: {
    margin: 5,
    width: 112,
    height: 112,
    paddingTop: 9,
    paddingBottom: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.darkGrey,
    borderWidth: 1,
    borderRadius: 3,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.background,
    height: 36 * 1.4,
    gap: -1,
  },
});

export default categoryButtonStyles;
