import { StyleSheet } from 'react-native';
import { layouts } from 'styles/theme';

const openEventScreenStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: layouts.PADDING,
    paddingHorizontal: layouts.PADDING,
  },
  containerContent: {
    rowGap: 20,
  },
});

export default openEventScreenStyles;
