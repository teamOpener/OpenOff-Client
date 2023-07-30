import { StyleSheet } from 'react-native';

const costStyles = StyleSheet.create({
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  input: {
    flex: 1,
  },
  absoluteContainer: {
    flex: 1,
  },
  absoluteHelpText: {
    position: 'absolute',
    bottom: -18,
    left: 0,
  },
});

export default costStyles;
