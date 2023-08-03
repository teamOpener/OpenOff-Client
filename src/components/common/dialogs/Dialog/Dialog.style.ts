import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';
import dialogStyles from '../dialogStyle';

const commonDialogStyles = StyleSheet.create({
  ...dialogStyles,
  typeShow: {
    position: 'absolute',
    top: -41,
    width: 83,
    height: 83,
    borderRadius: 300,
    backgroundColor: colors.darkGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 69,
    height: 69,
    borderRadius: 300,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 16,
    paddingHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 2,
  },
  buttonContainer: {
    paddingVertical: 9,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
    borderRadius: 25,
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

export default commonDialogStyles;
