import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const eventMapScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
  },
  selectContainer: {
    flexDirection: 'row',
    zIndex: 1,
  },
  sortButton: {
    marginTop: 18,
    marginLeft: 18,
  },
  bottomSheetContainer: {
    backgroundColor: colors.background,
    flexDirection: 'column',
  },
});

export default eventMapScreenStyles;
