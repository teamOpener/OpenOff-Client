import { StyleSheet } from 'react-native';

const checkButtonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkContainer: {
    width: 18,
    height: 18,
    marginRight: 10,
    marginVertical: 16,
  },
  check: {
    width: 18,
    height: 18,
  },
  checkButtonLabel: {
    fontSize: 17,
    color: '#FFF',
    fontWeight: '600',
  },
});

export default checkButtonStyles;
