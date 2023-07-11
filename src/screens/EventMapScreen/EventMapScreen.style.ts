import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const eventMapScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    width: '100%',
    height: '100%',
  },
  bottomSheetContainer: {
    backgroundColor: colors.background,
  },
});

export default eventMapScreenStyles;
