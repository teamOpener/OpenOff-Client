import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 73,
    marginBottom: 62,
    width: 110,
    height: 102,
  },
  middleText: {
    margin: 30,
  },
});

export default loginScreenStyles;
