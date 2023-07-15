import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const loginButtonStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGrey,
    borderRadius: 27.5,
    marginTop: 40,
    width: 350,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default loginButtonStyles;
