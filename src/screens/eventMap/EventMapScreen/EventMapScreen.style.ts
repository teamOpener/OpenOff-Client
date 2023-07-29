import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const eventMapScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
});

const defaultTabBarStyles = {
  backgroundColor: colors.background,
  borderTopColor: colors.darkGrey,
  borderLeftColor: colors.darkGrey,
  borderRightColor: colors.darkGrey,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: -1,
  right: -1,
  paddingTop: 6,
};

export { defaultTabBarStyles, eventMapScreenStyles };
