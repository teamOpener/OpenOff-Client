import { StyleSheet, TextStyle } from 'react-native';
import { colors } from 'styles/theme';

const fallbackErrorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: '-10%',
    gap: 34,
  },
  errorText: {
    textAlign: 'center',
  } as TextStyle,
  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 140,
    borderRadius: 50,
    backgroundColor: colors.main,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

export default fallbackErrorStyles;
