import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const userQRScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '-20%',
    alignItems: 'center',
    gap: 16,
  },
  absoluteStatus: {
    position: 'absolute',
    top: -50,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.error,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  topInfoText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
  cancelBtn: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },

  bottomInfo: {
    position: 'absolute',
    bottom: 40,
  },
  bottomInfoText: {
    textAlign: 'center',
  } as TextStyle,
});

export default userQRScreenStyles;
