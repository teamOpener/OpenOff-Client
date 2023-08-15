import { fonts } from 'styles/theme';
import { StyleSheet, TextStyle } from 'react-native';

const joinAndFindButtonStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 13,
  } as TextStyle,
});

export default joinAndFindButtonStyle;
