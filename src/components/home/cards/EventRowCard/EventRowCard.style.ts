import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const eventRowCardStyles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    height: 95,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginVertical: 5,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 5,
    margin: 10,
  },
  eventInfo: {
    marginHorizontal: 10,
    marginLeft: 5,
    flexDirection: 'column',
  },
  fieldBox: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Platform.OS === 'ios' ? 20 : 9,
    backgroundColor: colors.grey,
    alignSelf: 'flex-start',
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
    alignItems: 'center',
  },
});

export default eventRowCardStyles;
