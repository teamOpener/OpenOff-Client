import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const singleOptionGroupStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 38,
    zIndex: 99,
    minWidth: '100%',
    backgroundColor: colors.background,
    borderColor: colors.main,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default singleOptionGroupStyles;
