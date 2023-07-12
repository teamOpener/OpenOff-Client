import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const datePickScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  buttonContainer: {
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row',
  },
  button: {
    width: 116,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCenter: {
    borderRightColor: colors.white,
    borderRightWidth: 1,
    borderLeftColor: colors.white,
    borderLeftWidth: 1,
    width: 116,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default datePickScreenStyles;
