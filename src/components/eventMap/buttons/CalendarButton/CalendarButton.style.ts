import { StyleSheet } from 'react-native';

const calendarButtonStyles = StyleSheet.create({
  container: {
    maxWidth: 300,
    minWidth: 80,
    height: 54,
    borderRadius: 27.5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },
  labelText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
});

export default calendarButtonStyles;
