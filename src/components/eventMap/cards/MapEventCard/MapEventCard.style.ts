import { Dimensions, StyleSheet } from 'react-native';
import { fonts } from 'styles/theme';

const mapEventCardStyles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 20,
    zIndex: 1,
  },
  titleText: {
    maxWidth: (Dimensions.get('window').width * 85) / 100,
  },
  eventFieldContainer: {
    maxWidth: (Dimensions.get('window').width * 85) / 100,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  },
  textContainer: {
    width: '93%',
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  dateText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 15 * 1.4,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  streetLoadText: {
    maxWidth: '80%',
    flexWrap: 'wrap',
  },
  eventImage: {
    width: 124,
    height: 114,
    borderRadius: 3,
  },
});

export default mapEventCardStyles;
