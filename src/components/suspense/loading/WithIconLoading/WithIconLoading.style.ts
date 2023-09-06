import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const withIconLoadingStyles = StyleSheet.create({
  modalView: {
    margin: 0,
    height: '100%',
    backgroundColor: colors.background,
    width: '100%',
    zIndex: -1,
  },
  modalBackground: {
    backgroundColor: colors.background,
    height: '100%',
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
