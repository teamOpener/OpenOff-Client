import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const nicknameScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 25,
    lineHeight: 25 * 1.4,
    paddingVertical: 10,
    width: '100%',
  },
  titleContainer: {
    marginBottom: 40,
    marginTop: 20,
  },
});

export default nicknameScreenStyles;
