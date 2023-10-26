import { StyleSheet } from 'react-native';
import { layouts } from 'styles/theme';

const userEventScreenStyles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
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
  loadingContainer: {
    paddingVertical: 40,
  },
});

export default userEventScreenStyles;
