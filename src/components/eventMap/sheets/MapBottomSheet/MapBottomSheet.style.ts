import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const mapBottomSheetStyles = StyleSheet.create({
  sortButton: {
    marginLeft: 20,
    paddingBottom: 10,
  },
  sortButtonWrapper: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  dividerWrapper: {
    paddingHorizontal: 20,
  },
  bottomSheetSeparatorContainer: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  bottomSheetContainer: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    marginBottom: 50,
  },
  bottomSheetIndicatorStyle: {
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  bottomEmptyScreenStyle: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});

export default mapBottomSheetStyles;
