import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const eventCardStyles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 20,
    justifyContent: 'flex-start',
    gap: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    borderRadius: 5,
  },
  titleText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  } as TextStyle,
  iconText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 3,
    paddingRight: 4,
  },
  fieldBox: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#d9d9d9',
  },
});

export default eventCardStyles;
