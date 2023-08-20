import { StyleSheet } from 'react-native';

const costStyles = StyleSheet.create({
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  input: {
    flex: 1,
    width: '74%',
    alignSelf: 'flex-end',
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
