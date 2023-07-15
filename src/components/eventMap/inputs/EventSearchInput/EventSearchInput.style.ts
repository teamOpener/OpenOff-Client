import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from 'styles/theme';

const eventSearchInput = StyleSheet.create({
  absoluteContainer: {
    top: 30,
    left: 16,
    zIndex: 10,
    position: 'absolute',
  },
  container: {
    position: 'relative',
    backgroundColor: colors.white,
    height: 59,
    width: Dimensions.get('window').width - 40,
    borderRadius: 27.5,
  },
  searchInput: {
    position: 'absolute',
    left: 10,
    top: 5,
    width: Dimensions.get('window').width - 150,
    paddingLeft: 40,
    zIndex: 11,
  },
  searchButton: {
    position: 'absolute',
    zIndex: 16,
    left: 17,
    top: 18,
  },
  calendarButton: {
    position: 'absolute',
    right: 12,
    top: 8,
    borderRadius: 300,
    borderColor: colors.background,
    borderWidth: 1,
    width: 39,
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 99,
    top: 8,
    right: 60,
  },
  calendarText: {
    color: colors.background,
    fontSize: 10,
    lineHeight: 14,
    fontFamily: fonts.regular,
  },
});

export default eventSearchInput;
