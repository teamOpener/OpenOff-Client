import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const phoneCertificationScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '600',
    height: 50,
    marginTop: 20,
    marginBottom: 45,
  },
});

export default phoneCertificationScreenStyles;
