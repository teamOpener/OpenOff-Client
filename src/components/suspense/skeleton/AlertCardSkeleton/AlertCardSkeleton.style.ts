import { StyleSheet } from 'react-native';

const alertCardSkeletonStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
  },
  iconPlace: {
    width: 23,
    height: 23,
    borderRadius: 80,
  },
  alertInfo: {
    marginLeft: 25,
    gap: 3,
  },
  alertTitle: {
    width: 219,
    height: 18,
  },
  alertDate: {
    width: 42,
    height: 16,
  },
});

export default alertCardSkeletonStyles;
