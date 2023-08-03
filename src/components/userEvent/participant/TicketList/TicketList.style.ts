import { CONSTANT_PARTICIPANT } from 'constants/userEvent/participant/participantConstants';
import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const ticketListStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.main,
    borderRadius: 10,
    borderLeftWidth: 8,
    borderLeftColor: colors.lavender,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  info: {
    flex: 5.5,
    gap: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  titleText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  } as TextStyle,
  line: {
    flex: 1,
    paddingHorizontal: CONSTANT_PARTICIPANT.TICKET_MORE_BTN_PADDING_RIGHT / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: (CONSTANT_PARTICIPANT.CIRCLE_RADIUS / 2) * -1,
    marginBottom: (CONSTANT_PARTICIPANT.CIRCLE_RADIUS / 2) * -1,
  },
  circle: {
    borderRadius: 100,
    backgroundColor: colors.background,
    width: CONSTANT_PARTICIPANT.CIRCLE_RADIUS,
    height: CONSTANT_PARTICIPANT.CIRCLE_RADIUS,
  },
  more: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: CONSTANT_PARTICIPANT.TICKET_MORE_BTN_PADDING_RIGHT,
  },
});

export default ticketListStyles;
