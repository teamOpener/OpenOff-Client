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
    gap: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGrey,
  },
  typeShow: {
    position: 'absolute',
    top: -41,
    width: 83,
    height: 83,
    borderRadius: 300,
    backgroundColor: colors.darkGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 69,
    height: 69,
    borderRadius: 300,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 2,
  },
  buttonContainer: {
    paddingVertical: 9,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
    borderRadius: 25,
  },
  confirmButtonCover: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 15,
  },
  confirmButtonContainer: {
    paddingVertical: 9,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
    borderRadius: 25,
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    lineHeight: 23.8,
  } as TextStyle,
});

export default dialogStyles;
