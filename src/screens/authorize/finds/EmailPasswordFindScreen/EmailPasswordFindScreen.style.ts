import { Dimensions, StyleSheet } from 'react-native';

const emailPasswordFindScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  titleContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  findController: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'column',
  },
  buttonTextContainer: {
    width: Dimensions.get('window').width / 2,
    height: 41,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNotifier: {
    width: Dimensions.get('window').width / 2,
    height: 7,
  },
});

export default emailPasswordFindScreenStyles;
