import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const eventCardStyles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 20,
    justifyContent: 'flex-start',
    gap: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  titleText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  } as TextStyle,
  iconText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 3,
  },
});

export default eventCardStyles;
