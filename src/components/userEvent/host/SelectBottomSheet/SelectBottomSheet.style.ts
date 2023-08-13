import { TextStyle, StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const selectBottomSheetStyles = StyleSheet.create({
  sortContainer: {
    backgroundColor: colors.background,
  },
  bottomModalContainer: {
    flex: 1,
    paddingHorizontal: 40,
  },
  modalTitleContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  modalTitleText: {
    fontFamily: fonts.semibold,
    fontSize: 18,
  } as TextStyle,
  modalBackDrop: {
    opacity: 0.3,
  },
});

export default selectBottomSheetStyles;
