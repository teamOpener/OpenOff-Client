import { StyleSheet } from 'react-native';

const mapEventCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 20,
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
  eventImage: {
    width: 114,
    height: 114,
    marginRight: 2,
  },
});

export default mapEventCardStyles;
