import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const emailPasswordScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  titleContainer: {
    width: 350,
    height: 70,
    marginTop: 20,
    marginBottom: 50,
  },
});

export default emailPasswordScreenStyles;
