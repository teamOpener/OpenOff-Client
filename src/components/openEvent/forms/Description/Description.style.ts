import { Platform, StyleSheet } from 'react-native';
import { getPixelSize } from 'styles/styleUtils';

const descriptionStyles = StyleSheet.create({
  input: {
    minHeight: 140,
    paddingTop: Platform.select({
      android: getPixelSize(20),
      ios: 20,
    }),
    paddingBottom: Platform.select({
      android: getPixelSize(20),
      ios: 20,
    }),
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputWithHelpText: {
    gap: 5,
  },
});

export default descriptionStyles;
