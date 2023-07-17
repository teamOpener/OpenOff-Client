import { StyleSheet } from 'react-native';

const eventCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginRight: 20,
    justifyContent: 'flex-start',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  iconText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default eventCardStyles;
