import { StyleSheet } from 'react-native';
import { layouts } from 'styles/theme';

const categoryButtonGroupStyles = StyleSheet.create({
  titleContainer: {
    width: '100%',
  },
  container: {
    alignItems: 'center',
  },
  groupContainer: {
    marginLeft: -5,
  },
  groupContentContainer: {
    paddingRight: layouts.PADDING,
  },
});

export default categoryButtonGroupStyles;
