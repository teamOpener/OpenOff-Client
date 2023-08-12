import { StyleSheet } from 'react-native';
import { fonts } from 'styles/theme';

const genderInputStyles = StyleSheet.create({
  container: {
    marginLeft: 7,
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: 14,
    fontSize: 18,
    fontFamily: fonts.semibold,
  },
  genderButtonContainer: {
    flexDirection: 'row',
  },
});

export default genderInputStyles;
