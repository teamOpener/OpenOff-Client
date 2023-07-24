import { Dimensions, Platform, StyleSheet } from 'react-native';

const authorizeFlowButtonStyles = StyleSheet.create({
  absolutePosition: {
    marginBottom: 30,
    ...Platform.select({
      ios: {
        marginLeft: 20,
      },
      android: {
        position: 'absolute',
        bottom: 5,
        right: 20,
      },
    }),
  },
  container: {
    width: Dimensions.get('window').width - 40,
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
