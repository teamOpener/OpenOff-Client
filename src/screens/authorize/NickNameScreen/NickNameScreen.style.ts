import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const nickNameScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 25,
    height: 35,
    width: 350,
  },
  titleContainer: {
    marginBottom: 40,
    marginTop: 20,
  },
});

export default nickNameScreenStyles;
