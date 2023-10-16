import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const selectBoxGroup = StyleSheet.create({
  selectContainer: {
    zIndex: 1,
    overflow: 'visible',
  },
  selectContentContainer: {
    paddingRight: 18,
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
