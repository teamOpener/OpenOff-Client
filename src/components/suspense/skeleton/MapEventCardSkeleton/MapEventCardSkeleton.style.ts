import { StyleSheet } from 'react-native';

const mapCardSkeletonStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    margin: 20,
    marginTop: 0,
    rowGap: 4,
    zIndex: 1,
  },
  title: {
    borderRadius: 6,
    width: 109,
    height: 28,
  },
  contents: {
    borderRadius: 6,
    width: 302,
    height: 18,
  },
  imageContainer: {
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  eventImage: {
    width: 114,
    height: 114,
  },
});

export default mapCardSkeletonStyles;
