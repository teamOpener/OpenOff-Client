import { Dimensions, StyleSheet } from 'react-native';

const mapFieldButtonGroup = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 999,
    top: 121,
    width: Dimensions.get('window').width,
    right: 0,
  },
});

export default mapFieldButtonGroup;
