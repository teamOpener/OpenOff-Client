import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    gap: 30,
  },
  logo: {
    marginTop: 13,
    width: 110,
    height: 102,
  },
  middleText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    alignSelf: 'center',
  },
});

export default loginScreenStyles;
