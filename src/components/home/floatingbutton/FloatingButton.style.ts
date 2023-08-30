import { Platform, StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const floatingButtonStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 66,
    right: 16,
    zIndex: 1,
    backgroundColor: colors.background,
    borderRadius: 100,
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

export default floatingButtonStyles;
