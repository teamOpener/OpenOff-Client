import { Dimensions, StyleSheet } from 'react-native';

const scrapEventListStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowGap: {
    paddingVertical: 10,
  },
  scrapSkeletonLayout: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});

export default scrapEventListStyles;
