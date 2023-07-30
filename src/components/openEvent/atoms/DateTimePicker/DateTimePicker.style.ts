import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const dateTimePickerStyles = StyleSheet.create({
  exitWrapper: {
    position: 'absolute',
    top: -6,
    right: -9,
    zIndex: 1,
    backgroundColor: colors.darkGrey,
    borderRadius: 100,
  },
});

export default dateTimePickerStyles;
