import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const emailPasswordScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    marginTop: 40,
    marginBottom: 100,
    color: 'white',
    fontSize: 25,
    height: 35,
    width: 350,
  },
});

export default emailPasswordScreenStyles;
