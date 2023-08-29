import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts, layouts } from 'styles/theme';

const staffManagementScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: layouts.PADDING,
    paddingHorizontal: layouts.PADDING,
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    lineHeight: 17 * 1.4,
  } as TextStyle,
  hostWrapper: {
    borderBottomColor: colors.main,
    borderBottomWidth: 1,
  },
  infoText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
  infoContainer: {
    alignItems: 'center',
  },
  staffListContentContainer: {
    gap: 16,
  },
});

export default staffManagementScreenStyles;
