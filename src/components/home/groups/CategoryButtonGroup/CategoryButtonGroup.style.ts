import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const categoryButtonGroupStyles = StyleSheet.create({
  titleContainer: {
    width: '100%',
  },
  container: {
    alignItems: 'center',
  },
  groupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -5,
  },
  categoryImage: {
    width: 107,
    height: 107,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  centerDot: {
    textAlign: 'center',
    lineHeight: 6 * 1.2,
    fontSize: 6,
    fontFamily: fonts.bold,
  },
  buttonContainer: {
    margin: 5,
    width: 112,
    height: 112,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderColor: colors.darkGrey,
    borderWidth: 1,
    borderRadius: 3,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.background,
    height: 36 * 1.2,
  },
});

export default categoryButtonGroupStyles;
