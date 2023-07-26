import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const authorizeFlowButtonStyles = StyleSheet.create({
  absolutePosition: {
    backgroundColor: colors.background,
    marginBottom: 30,
    marginLeft: 20,
  },
  container: {
    marginTop: 16,
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
