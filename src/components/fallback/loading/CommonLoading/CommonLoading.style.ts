import { StyleSheet } from 'react-native';

const commonLoadingStyles = StyleSheet.create({
  modalView: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalBackground: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },
});

export default commonLoadingStyles;
