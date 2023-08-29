import { StyleSheet } from 'react-native';

const eventCardSkeletonStyles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 20,
    justifyContent: 'flex-start',
    gap: 4,
    marginBottom: 10,
  },
  image: {
    borderRadius: 5,
  },
  title: {
    width: 114,
    height: 18,
    borderRadius: 5,
  },
  date: {
    width: 59,
    height: 10,
    borderRadius: 5,
  },
  contents: {
    width: 102,
    height: 10,
    borderRadius: 5,
  },
  likeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});

export default eventCardSkeletonStyles;
