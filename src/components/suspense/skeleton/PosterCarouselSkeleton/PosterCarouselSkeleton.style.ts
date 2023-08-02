import { CONSTANT_EVENT_DETAIL } from 'constants/eventDetail/eventDetailConstants';
import { Dimensions, StyleSheet } from 'react-native';

const posterCarouselSkeletonStyles = StyleSheet.create({
  container: {
    width:
      Dimensions.get('window').width - CONSTANT_EVENT_DETAIL.SCREEN_PADDING * 2,
    height:
      Dimensions.get('window').width - CONSTANT_EVENT_DETAIL.SCREEN_PADDING * 2,
  },
});

export default posterCarouselSkeletonStyles;
