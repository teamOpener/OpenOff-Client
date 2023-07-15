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
});

export default eventMapScreenStyles;
