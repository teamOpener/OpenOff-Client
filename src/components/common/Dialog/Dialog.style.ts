import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

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
    padding: 35,
    width: 340,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 2,
    marginTop: 71,
  },
  buttonContainer: {
    paddingVertical: 9,
    paddingHorizontal: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
    marginTop: 35,
    borderRadius: 25,
  },
});

export default dialogStyles;
