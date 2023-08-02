import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const eventRowCardSkeletonStyles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    borderRadius: 6,
    backgroundColor: colors.white,
    marginVertical: 5,
    padding: 10,
  },
  skeletonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 5,
  },
  eventInfo: {
    gap: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  fieldBox: {
    height: 18,
    width: 33,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  eventTitle: {
    width: 180,
    height: 18,
  },
  contents: {
    width: 59,
    height: 14,
  },
  subInfoText: {
    width: 100,
    height: 14,
  },
});

export default eventRowCardSkeletonStyles;
