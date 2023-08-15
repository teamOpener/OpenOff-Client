import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const hostLedgerScreenStyles = StyleSheet.create({
  statusContainer: {
    paddingBottom: 20,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alignItemCenter: {
    alignItems: 'center',
  },
  full: {
    flex: 1,
  },
  searchContainerGap: {
    gap: 40,
  },
  peopleText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  } as TextStyle,
  approveText: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.4,
  } as TextStyle,
  totalApproveBtn: {
    backgroundColor: colors.main,
  },
  sortBtnText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
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
    lineHeight: 15 * 1.4,
    color: colors.white,
  },
  scrollContainer: {
    flex: 1,
  },
  flatListContentStyle: {
    paddingBottom: 100,
  },
});

export default hostLedgerScreenStyles;
