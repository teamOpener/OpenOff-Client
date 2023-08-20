import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const currentFieldFindButtonStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 3,
    gap: 15,
    top: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: colors.main,
    left: Dimensions.get('window').width / 2 - 87.5,
    width: 175,
    borderRadius: 17,
    height: 33,
  },
});

export default currentFieldFindButtonStyles;
