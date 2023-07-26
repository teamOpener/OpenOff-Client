import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const mapBottomSheetStyles = StyleSheet.create({
  sortButton: {
    margin: 18,
  },
  bottomSheetContainer: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    marginBottom: 20,
  },
});

export default mapBottomSheetStyles;
