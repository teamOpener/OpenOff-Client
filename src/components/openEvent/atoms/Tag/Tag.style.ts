import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const tagStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderColor: colors.main,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  selectedContainer: {
    backgroundColor: colors.main,
  },
  narrowContainer: {
    paddingHorizontal: 14,
  },
});

export default tagStyles;
