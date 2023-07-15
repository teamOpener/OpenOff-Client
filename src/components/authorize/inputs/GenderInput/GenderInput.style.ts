import { StyleSheet } from 'react-native';

const genderInputStyles = StyleSheet.create({
  container: {
    marginBottom: 22,
    marginLeft: 7,
    width: 250,
    flexDirection: 'column',
  },
  title: {
    marginBottom: 21,
  },
  genderButtonContainer: {
    flexDirection: 'row',
  },
  errorText: {
    color: 'red',
  },
});

export default genderInputStyles;
