import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  logo: {
    marginTop: 13,
    marginBottom: 62,
    width: 110,
    height: 102,
  },
  middleText: {
    marginTop: 30,
    marginBottom: 10,
  },
  joinAndFindContainer: {
    marginTop: 40,
  },
});

export default loginScreenStyles;
