import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

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
    width: 359,
    borderRadius: 27.5,
  },
  searchInput: {
    position: 'absolute',
    left: 10,
    top: 5,
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
});

export default eventSearchInput;
