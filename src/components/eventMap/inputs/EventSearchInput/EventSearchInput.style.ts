import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const eventSearchInput = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    top: 30,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    borderRadius: 27.5,
    paddingLeft: 22,
    paddingRight: 9,
    paddingVertical: 8,
  },
  searchInput: {
    fontFamily: fonts.regular,
    color: colors.background,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    zIndex: 11,
    flex: 1,
    paddingVertical: 0,
  },
  searchButton: {
    zIndex: 16,
  },
  calendarButton: {
    borderColor: colors.background,
    borderWidth: 1,
    borderRadius: 300,
    width: 39,
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  calendarText: {
    color: colors.background,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: fonts.regular,
  },
});

export default eventSearchInput;
