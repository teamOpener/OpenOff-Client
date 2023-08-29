import { StyleSheet } from 'react-native';
import { layouts } from 'styles/theme';

const userEventScreenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: layouts.PADDING,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    paddingTop: '68%',
    alignItems: 'center',
  },
  flatListContentStyle: {
    paddingBottom: 100,
  },
  loadingContainer: {
    paddingVertical: 40,
  },
});

export default userEventScreenStyles;
