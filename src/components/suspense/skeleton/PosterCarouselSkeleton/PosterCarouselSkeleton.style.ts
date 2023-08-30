import { Dimensions, StyleSheet } from 'react-native';
import { layouts } from 'styles/theme';

const posterCarouselSkeletonStyles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - layouts.PADDING * 2,
    height: Dimensions.get('window').width - layouts.PADDING * 2,
  },
});

export default posterCarouselSkeletonStyles;
