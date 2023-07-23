import { Platform, StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const phoneAuthButtonStyles = StyleSheet.create({
  container: {
    height: '100%',
  },
  activeButton: {
    width: 80,
    height: 40,
    marginTop: Platform.OS === 'android' ? 35 : 46,
    marginLeft: 5,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.white,
    borderWidth: 1,
  },
  nonActiveButton: {
    width: 80,
    height: 40,
    marginTop: 35,
    marginLeft: 10,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGrey,
  },
});

export default phoneAuthButtonStyles;
