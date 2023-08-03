import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';
import dialogStyles from '../dialogStyle';

const confirmDialogStyles = StyleSheet.create({
  ...dialogStyles,
  textContainer: {
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingBottom: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 2,
  },
  confirmButtonCover: {
    flexDirection: 'row',
    gap: 10,
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
