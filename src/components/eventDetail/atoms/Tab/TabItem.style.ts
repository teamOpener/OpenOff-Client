import { StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const tabItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 3,
    borderBottomColor: colors.white,
  },
  activeContainer: {
    borderBottomColor: colors.point,
  },
  text: {
    fontFamily: fonts.bold,
    fontSize: 14,
  } as TextStyle,
});

export default tabItemStyles;