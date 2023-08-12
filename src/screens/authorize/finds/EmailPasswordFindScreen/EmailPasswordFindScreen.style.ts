import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const emailPasswordFindScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  findController: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderBottomWidth: 5,
    borderBottomColor: colors.background,
  },
  activeButton: {
    borderBottomColor: colors.main,
  },
  buttonTextContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 21,
  } as TextStyle,
});

export default emailPasswordFindScreenStyles;
