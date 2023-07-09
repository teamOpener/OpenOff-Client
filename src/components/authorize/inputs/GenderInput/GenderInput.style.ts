import { StyleSheet } from 'react-native';

const genderInputStyles = StyleSheet.create({
  container: {
    margin: 7,
    width: 250,
    flexDirection: 'column',
  },
  genderButtonContainer: {
    flexDirection: 'row',
  },
  errorText: {
    color: 'red',
  },
});

export default genderInputStyles;
