import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const carouselCardStyle = StyleSheet.create({
  container: {
    backgroundColor: 'floralwhite',
    borderRadius: 13,
    marginRight: 20,
    height: 237,
    overflow: 'hidden',
  },
  carouselInfo: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 25,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  fieldContainer: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 15.5,
    borderColor: colors.white,
  },
  pageInfo: {
    height: 16,
    width: 30,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 5,
    right: 5,
    borderRadius: 8,
    backgroundColor: colors.darkGrey,
  },
  pageText: {
    fontFamily: fonts.regular,
    fontSize: 10,
    lineHeight: 10 * 1.4,
  },
});

export default carouselCardStyle;
