import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const staffListStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.main,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    color: colors.main,
  } as TextStyle,
  inActiveText: {
    color: colors.grey,
  },
  iconWrapper: {
    backgroundColor: colors.main,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  inActiveIconWrapper: {
    backgroundColor: colors.grey,
  },
  inactiveContainer: {
    borderBottomColor: colors.grey,
  },
  searchContainer: {},
  searchContentContainer: {
    gap: 5,
  },
  searchText: {
    fontFamily: fonts.regular,
    fontSize: 17,
    lineHeight: 17 * 1.4,
  },
  nameTag: {
    backgroundColor: colors.darkGrey,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});

export default staffListStyles;
