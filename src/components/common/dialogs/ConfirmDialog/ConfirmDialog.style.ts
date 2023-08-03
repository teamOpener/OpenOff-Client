import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';
import dialogStyles from '../dialogStyle';

const confirmDialogStyles = StyleSheet.create({
  ...dialogStyles,
  textContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 2,
  },
  confirmButtonCover: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 15,
  },
  confirmButtonContainer: {
    paddingVertical: 9,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
    borderRadius: 25,
  },
});

export default confirmDialogStyles;
