import { Platform, StyleSheet } from 'react-native';
import { fonts } from 'styles/theme';

const genderInputStyles = StyleSheet.create({
  container: {
    marginLeft: 7,
    flexDirection: 'column',
    ...Platform.select({
      ios: {
        marginTop: -5,
      },
    }),
  },
  title: {
    marginBottom: 14,
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
