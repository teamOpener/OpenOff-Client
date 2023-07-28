import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const imageButtonStyles = StyleSheet.create({
  container: {
    width: 122,
    height: 122,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  cameraWrapper: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 4.5,
  },
  plusWrapper: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    backgroundColor: colors.grey,
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  exitWrapper: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 1,
    backgroundColor: colors.darkGrey,
    borderRadius: 100,
  },
  primaryLabel: {
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: colors.main,
  },
  primaryLabelText: {
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  image: {
    resizeMode: 'cover',
    flex: 1,
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});

export default imageButtonStyles;
