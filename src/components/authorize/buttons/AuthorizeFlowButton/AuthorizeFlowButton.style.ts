import { Dimensions, StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const authorizeFlowButtonStyles = StyleSheet.create({
  absolutePosition: {
    backgroundColor: colors.background,
    marginBottom: 30,
    marginLeft: 20,
  },
  container: {
    marginTop: 16,
    width: Dimensions.get('window').width - 40,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    lineHeight: 17 * 1.4,
  },
});

export default authorizeFlowButtonStyles;
