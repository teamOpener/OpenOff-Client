import { Platform, StyleSheet } from 'react-native';

const topFieldButtonStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
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
