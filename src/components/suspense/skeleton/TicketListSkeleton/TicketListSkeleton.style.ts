import { StyleSheet } from 'react-native';

const ticketListSkeletonStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
  },
  starIcon: {
    left: '8%',
    top: -10,
  },
  heartIcon: {
    left: '80%',
    bottom: -8,
  },
  item: { width: '100%', height: 100, borderRadius: 10 },
});

export default ticketListSkeletonStyles;
