import { Dimensions, StyleSheet } from 'react-native';

const bookmarkCardListStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListcontainer: {
    flex: 1,
  },
  rowGap: {
    marginBottom: 35,
  },
  skeletonContainer: {
    width: Dimensions.get('window').width,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
});

export default bookmarkCardListStyles;
