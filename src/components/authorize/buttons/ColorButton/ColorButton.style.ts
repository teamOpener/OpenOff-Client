import { StyleSheet } from 'react-native';

const colorButtonStyles = StyleSheet.create({
  container: {
    maxWidth: 300,
    minWidth: 80,
    height: 35,
    borderRadius: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },
  labelText: {
    fontSize: 14,
  },
});

export default colorButtonStyles;
