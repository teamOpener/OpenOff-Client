import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const ticketQRStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.main,
    borderRadius: 35,
    padding: 25,
    alignItems: 'center',
  },
  attendedContainer: {
    backgroundColor: colors.lightGreen,
  },
  endedContainer: {
    backgroundColor: colors.grey,
  },
  eventInfo: {
    paddingBottom: 16,
    gap: 3,
  },
  qrWrapper: {
    backgroundColor: colors.white,
    padding: 28,
    borderRadius: 25,
  },
  expiredQrWrapper: {
    opacity: 0.3,
  },
  ticketIndex: {
    fontFamily: fonts.regular,
    fontSize: 13,
  } as TextStyle,
  userInfo: {
    paddingTop: 10,
    paddingBottom: 15,
  },
});

export default ticketQRStyles;