import { StyleSheet } from 'react-native';
import { colors, fonts, layouts } from 'styles/theme';

const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: layouts.PADDING,
    paddingBottom: 30,
  },
  contentContainer: {
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    gap: 30,
  },
  logo: {
    marginTop: 13,
    marginBottom: 30,
    width: 110,
    height: 102,
  },
  middleText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    alignSelf: 'center',
  },
});

export default loginScreenStyles;
