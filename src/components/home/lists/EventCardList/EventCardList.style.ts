import { StyleSheet } from 'react-native';

const eventCardListStyles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 25,
  },
  showAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  container: {
    marginTop: 23,
    marginBottom: 24,
  },
  scrollConatiner: {
    marginTop: 15,
  },
});

export default eventCardListStyles;
