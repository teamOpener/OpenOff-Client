import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const mapBottomSheetStyles = StyleSheet.create({
  sortButton: {
    marginTop: 18,
    marginLeft: 18,
  },
  bottomSheetContainer: {
    backgroundColor: colors.background,
    flexDirection: 'column',
  },
});

export default mapBottomSheetStyles;
