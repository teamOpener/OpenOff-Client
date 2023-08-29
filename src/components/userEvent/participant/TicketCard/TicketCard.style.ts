import { CONSTANT_PARTICIPANT } from 'constants/userEvent/participant/participantConstants';
import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const ticketCardStyles = StyleSheet.create({
  container: {
    width: CONSTANT_PARTICIPANT.TICKET_WIDTH,
    borderRadius: 26,
    alignSelf: 'center',
  },
  eventMainInfo: {
    paddingHorizontal: 25,
    paddingTop: 18,
    paddingBottom: 45,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 27,
    lineHeight: 37.8,
  } as TextStyle,
  address: {
    fontFamily: fonts.medium,
    fontSize: 20,
    lineHeight: 20 * 1.4,
  } as TextStyle,
  reservationNumber: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 13 * 1.4,
  } as TextStyle,
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 35,
    overflow: 'hidden',
  },
  eventSubInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: 25,
    paddingTop: 45,
    paddingRight: 18,
    paddingBottom: 25,
  },
  dateTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  date: {
    fontFamily: fonts.semibold,
    fontSize: 25,
    lineHeight: 25 * 1.4,
  } as TextStyle,
  day: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 16 * 1.4,
  } as TextStyle,
  time: {
    fontFamily: fonts.semibold,
    fontSize: 25,
    lineHeight: 25 * 1.2,
  } as TextStyle,
  btn: {
    backgroundColor: colors.lavender,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  btnText: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 21,
    letterSpacing: -0.32,
  } as TextStyle,
});

export default ticketCardStyles;
