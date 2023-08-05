import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const dateSelectorStyles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  mainContainer: {
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 16,
    paddingLeft: 5,
  },
  dateText: {
    fontFamily: fonts.bold,
    fontSize: 14,
  } as TextStyle,
  absoluteContainer: {
    backgroundColor: colors.background,
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  dateList: {
    paddingVertical: 14,
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    borderTopColor: colors.main,
    borderTopWidth: 1,
  },
});

export default dateSelectorStyles;
