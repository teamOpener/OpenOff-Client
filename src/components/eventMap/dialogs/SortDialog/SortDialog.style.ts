import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

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
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  buttonContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
  },
  title: {
    width: 200,
  },
  textContainer: {
    width: 200,
  },
  emptySpace: {
    width: 15,
    height: 15,
  },
  cancelContainer: {
    width: 200,
    alignItems: 'flex-end',
  },
});

export default sortDialogStyles;
