import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const mapFieldButtonStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 34,
    borderRadius: 17,
    borderColor: colors.main,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
});

export default mapFieldButtonStyles;
