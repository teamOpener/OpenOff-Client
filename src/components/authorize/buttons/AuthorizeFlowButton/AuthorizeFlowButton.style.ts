import { Dimensions, StyleSheet } from 'react-native';

const authorizeFlowButtonStyles = StyleSheet.create({
  absolutePosition: {
    position: 'absolute',
    bottom: 45,
    left: Dimensions.get('window').width - 370,
  },
  container: {
    width: 350,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
  },
});

export default authorizeFlowButtonStyles;
