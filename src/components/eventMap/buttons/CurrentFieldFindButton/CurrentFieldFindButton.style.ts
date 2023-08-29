import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const currentFieldFindButtonStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 3,
    top: 30,
    left: 0,
    right: 0,
  },
  container: {
    gap: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: colors.black,
    borderRadius: 17,
    paddingHorizontal: 12.5,
    paddingVertical: 5.5,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 13 * 1.4,
  },
});

export default currentFieldFindButtonStyles;
