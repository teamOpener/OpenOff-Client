import { StyleSheet } from 'react-native';

const additionalInfoStyles = StyleSheet.create({
  inputContainer: {
    gap: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  inputRowContainer: { gap: 10 },
  iconContainer: {
    padding: 4,
    backgroundColor: '#646464',
    borderRadius: 100,
  },
  icon: {
    opacity: 0.8,
  },
  infoGroup: {
    gap: 5,
  },
});

export default additionalInfoStyles;
