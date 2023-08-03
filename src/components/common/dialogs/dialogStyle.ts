import { Dimensions, StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const dialogStyles = StyleSheet.create({
  modalView: {
    margin: 0,
    height: Dimensions.get('window').height,
  },
  modalBackground: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    position: 'relative',
    borderRadius: 15,
    width: 310,
    paddingTop: 52,
    gap: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGrey,
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    lineHeight: 23.8,
  } as TextStyle,
});

export default dialogStyles;
