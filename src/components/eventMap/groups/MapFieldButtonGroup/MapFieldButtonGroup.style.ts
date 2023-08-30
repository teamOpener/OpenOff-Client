import { Dimensions, StyleSheet } from 'react-native';

const mapFieldButtonGroup = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 999,
    top: 95,
    width: Dimensions.get('window').width,
    paddingLeft: 20,
    right: 0,
  },
  contentContainer: {
    paddingRight: 40,
  },
});

export default mapFieldButtonGroup;
