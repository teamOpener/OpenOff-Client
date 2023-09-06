import { Dimensions, StyleSheet } from 'react-native';

const infinityEventCardList = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowGap: {
    paddingVertical: 10,
  },
  skeletonContainer: {
    width: Dimensions.get('window').width,
    flex: 1,
    gap: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default infinityEventCardList;
