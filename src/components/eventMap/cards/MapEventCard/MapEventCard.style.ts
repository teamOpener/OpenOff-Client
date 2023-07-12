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
  textContainer: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    marginTop: 5,
  },
  eventImage: {
    width: 114,
    height: 114,
    marginRight: 10,
  },
});

export default mapEventCardStyles;
