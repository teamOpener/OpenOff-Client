import { Dimensions, StyleSheet } from 'react-native';
import { colors, fonts } from 'styles/theme';

const mapHeaderStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 6,
    width: Dimensions.get('window').width,
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: 21,
    marginLeft: 20.84,
  },
  backButton: {
    marginLeft: 15,
  },
});

export default mapHeaderStyles;
