import CONSTANT_HOST from 'constants/userEvent/host/hostConstants';
import { StyleSheet } from 'react-native';

const consoleScreenLayoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: CONSTANT_HOST.CONSOLE_SCREEN_PADDING,
    justifyContent: 'space-evenly',
  },
});

export default consoleScreenLayoutStyles;
