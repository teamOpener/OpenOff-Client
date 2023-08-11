import { StyleSheet, TextStyle } from 'react-native';
import { fonts } from 'styles/theme';

const sortOptionStyles = StyleSheet.create({
  modalTextContainer: {
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: fonts.medium,
    fontSize: 15,
  } as TextStyle,
});

export default sortOptionStyles;
