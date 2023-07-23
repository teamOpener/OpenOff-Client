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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  fieldContainer: {
    marginTop: 10,
    height: 26,
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
  },
});

export default carouselCardStyle;
