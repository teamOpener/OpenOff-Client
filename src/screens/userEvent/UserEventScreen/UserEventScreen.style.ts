import { StyleSheet } from 'react-native';

const userEventScreenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
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
