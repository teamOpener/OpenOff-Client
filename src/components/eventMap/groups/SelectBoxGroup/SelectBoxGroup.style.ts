import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const selectBoxGroup = StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    zIndex: 1,
  },
  buttonContainer: {
    borderColor: colors.white,
    borderWidth: 1,
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 18,
  },
});

export default selectBoxGroup;
