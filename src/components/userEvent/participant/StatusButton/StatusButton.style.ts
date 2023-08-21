import { CONSTANT_PARTICIPANT } from 'constants/userEvent/participant/participantConstants';
import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const statusButtonStyles = StyleSheet.create({
  container: {
    height: CONSTANT_PARTICIPANT.QR_BUTTON_HEIGHT, // text만 띄어져 있을 때와 동일하게 하고자 높이 고정
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    position: 'absolute',
    bottom: -30,
    alignSelf: 'center',
  },
  qrWrapper: {
    backgroundColor: colors.main,
    padding: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  qrText: {
    fontFamily: fonts.regular,
    fontSize: 10,
    lineHeight: 10 * 1.4,
  } as TextStyle,
});

export default statusButtonStyles;
