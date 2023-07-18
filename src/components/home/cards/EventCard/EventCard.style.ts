import { StyleSheet } from 'react-native';

const eventCardStyles = StyleSheet.create({
  container: {
    position: 'relative',
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
  likeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});

export default eventCardStyles;
