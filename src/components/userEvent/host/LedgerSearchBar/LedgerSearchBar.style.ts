import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const ledgerSearchBarStyles = StyleSheet.create({
  alignItemCenter: {
    alignItems: 'center',
  },
  full: {
    flex: 1,
  },
  searchOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(185, 185, 185, 0.10)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.white,
    paddingVertical: 4,
    paddingLeft: 10,
    paddingRight: 6,
  },
  searchInnerContainer: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.white,
  },
});

export default ledgerSearchBarStyles;
