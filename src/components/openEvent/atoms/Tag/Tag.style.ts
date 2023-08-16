import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const tagStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 30,
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
});

export default tagStyles;
