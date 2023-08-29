import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const mapBottomSheetStyles = StyleSheet.create({
  sortButton: {
    margin: 18,
  },
  bottomSheetContainer: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    marginBottom: 50,
  },
  bottomEmptyScreenStyle: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});

export default mapBottomSheetStyles;
