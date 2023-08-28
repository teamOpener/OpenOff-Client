import { Dimensions, StyleSheet } from 'react-native';

const mapEventCardStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 20,
    zIndex: 1,
  },
  titleText: {
    maxWidth: (Dimensions.get('window').width * 85) / 100,
  },
  eventFieldContainer: {
    maxWidth: (Dimensions.get('window').width * 85) / 100,
  },
  textContainer: {
    width: '93%',
    marginTop: 5,
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  streetLoadText: {
    maxWidth: '80%',
    flexWrap: 'wrap',
  },
  eventImage: {
    width: 114,
    height: 114,
  },
});

export default mapEventCardStyles;
