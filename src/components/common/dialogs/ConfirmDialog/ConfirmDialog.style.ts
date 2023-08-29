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
  reasonContainer: {
    paddingVertical: 6,
    flexDirection: 'row',
    gap: 8,
  },
  circle: {
    marginLeft: 14,
    borderRadius: 100,
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  activeCircle: {
    backgroundColor: colors.grey,
  },
});

export default confirmDialogStyles;
