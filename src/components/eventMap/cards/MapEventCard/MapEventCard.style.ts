import { StyleSheet } from 'react-native';

const mapEventCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 20,
    zIndex: 1,
  },
  titleText: {
    maxWidth: '60%',
    flexWrap: 'wrap',
  },
  eventFieldContainer: {
    flexWrap: 'wrap',
    maxWidth: '60%',
    gap: 10,
    flexDirection: 'row',
  },
  textContainer: {
    marginTop: 5,
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
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
