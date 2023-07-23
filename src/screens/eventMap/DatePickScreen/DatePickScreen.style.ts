import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const datePickScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  dateTitle: {
    width: Dimensions.get('window').width - 40,
    marginBottom: 16,
    marginTop: 50,
  },
  buttonContainer: {
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  button: {
    width: 116,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCenter: {
    borderRightColor: colors.white,
    borderRightWidth: 1,
    borderLeftColor: colors.white,
    borderLeftWidth: 1,
    width: 116,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    right: (Dimensions.get('window').width - 350) / 2,
  },
});

export default datePickScreenStyles;
