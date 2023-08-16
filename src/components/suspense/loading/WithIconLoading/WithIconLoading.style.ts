import { StyleSheet } from 'react-native';

const withIconLoadingStyles = StyleSheet.create({
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
  },
  leftIcon: {
    marginLeft: -8,
    marginBottom: -1,
  },
  rightTopIcon: {
    marginTop: -10,
    marginRight: -14,
    alignSelf: 'flex-end',
  },
  rightIcon: {
    marginTop: 1,
    marginRight: -2,
    alignSelf: 'flex-end',
  },
  absoluteCircle: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    marginTop: -33,
    width: 68,
    height: 68,
    borderWidth: 1,
    borderColor: 'rgba(185, 185, 185, 0.20)',
    borderRadius: 100,
  },
});

export default withIconLoadingStyles;
