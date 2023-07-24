import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const joinCompleteScreenStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: 'column',
  },
  myFieldTitle: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 18,
  },
  myFieldContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  myField: {
    color: colors.main,
    fontFamily: fonts.regular,
    fontSize: 18,
    marginRight: 10,
  },
});

export default joinCompleteScreenStyles;
