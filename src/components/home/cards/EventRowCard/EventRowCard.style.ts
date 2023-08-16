import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const eventRowCardStyles = StyleSheet.create({
  container: {
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    backgroundColor: colors.white,
    marginVertical: 5,
    padding: 10,
    flex: 1,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 5,
  },
  eventInfo: {
    flex: 1,
    alignItems: 'flex-start',
    height: '100%',
    justifyContent: 'space-between',
  },
  fieldBoxContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  fieldBox: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#d9d9d9',
  },
  eventTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 21,
    color: colors.black,
  },
  subInfo: {
    flexDirection: 'row',
  },
  subInfoText: {
    flexDirection: 'row',
    marginRight: 5,
    gap: 3,
    alignItems: 'center',
  },
  bookmarkButtonWrapper: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});

export default eventRowCardStyles;
