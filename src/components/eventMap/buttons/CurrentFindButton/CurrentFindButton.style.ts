import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const currentFindButtonStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 3,
    top: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: colors.main,
    left: Dimensions.get('window').width / 2 - 100,
    width: 200,
    borderRadius: 17,
    height: 33,
  },
});

export default currentFindButtonStyles;
