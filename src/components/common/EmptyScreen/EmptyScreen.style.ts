import { StyleSheet } from 'react-native';

const emptyScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  emptyImage: {
    marginTop: -50,
    width: 100,
    height: 100,
  },
});

export default emptyScreenStyles;
