import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const sortDialogStyles = StyleSheet.create({
  modalView: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 800,
  },
  modalBackground: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
  },
  modalContainer: {
    width: 300,
    borderRadius: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  buttonContainer: {
    paddingTop: 20,
    paddingRight: 25,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
  textContainer: {
    paddingHorizontal: 25,
  },
  cancelContainer: {
    paddingRight: 25,
    alignItems: 'flex-end',
  },
  cancelText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  },
});

export default sortDialogStyles;
