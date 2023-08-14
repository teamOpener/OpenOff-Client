import { Platform, StyleSheet } from 'react-native';

const topFieldButtonStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldText: {
    marginHorizontal: 6,
  },
  delimiter: {
    height: Platform.OS === 'android' ? 5 : 3,
    width: '100%',
    marginTop: 5,
  },
});

export default topFieldButtonStyles;
