import { StyleSheet } from 'react-native';
import { fonts } from 'styles/theme';

const genderInputStyles = StyleSheet.create({
  container: {
    marginLeft: 7,
    flexDirection: 'column',
  },
  title: {
    marginBottom: 21,
    color: 'white',
    fontSize: 18,
    fontFamily: fonts.semibold,
  },
  genderButtonContainer: {
    flexDirection: 'row',
  },
  errorText: {
    color: 'red',
  },
});

export default genderInputStyles;
