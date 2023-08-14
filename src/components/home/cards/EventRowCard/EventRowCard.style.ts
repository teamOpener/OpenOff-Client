import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const eventRowCardStyles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    position: 'relative',
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    backgroundColor: colors.white,
    marginVertical: 5,
    padding: 10,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 5,
  },
  eventInfo: {
    gap: Platform.OS === 'ios' ? 2 : 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
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
});

export default eventRowCardStyles;
