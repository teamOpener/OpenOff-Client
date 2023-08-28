import { Platform, StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const myCoordinateButtonStyles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    borderRadius: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    zIndex: 2,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});

export default myCoordinateButtonStyles;
