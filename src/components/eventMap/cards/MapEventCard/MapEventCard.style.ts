import { StyleSheet } from 'react-native';

const mapEventCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 20,
    zIndex: 1,
  },
  textMargin: {
    marginRight: 10,
  },
  eventFieldContainer: {
    marginHorizontal: 10,
    gap: 10,
    flexDirection: 'row',
  },
  textContainer: {
    marginTop: 5,
    maxWidth: '50%',
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
  eventImage: {
    width: 114,
    height: 114,
  },
});

export default mapEventCardStyles;
