import { StyleSheet } from 'react-native';
import { layouts } from 'styles/theme';

const eventDetailScreenStyles = StyleSheet.create({
  poster: {
    width: '100%',
    minHeight: 200,
  },
  bookmarkButtonWrapper: {
    flex: 1,
    marginBottom: 4,
    marginRight: layouts.PADDING,
  },
  full: {
    flex: 1,
  },
  descriptionWrapper: {
    paddingBottom: 60,
  },
});

export default eventDetailScreenStyles;
