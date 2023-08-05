import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingHorizontal: 20,
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
    marginTop: 25,
  },
});

export default loginScreenStyles;
