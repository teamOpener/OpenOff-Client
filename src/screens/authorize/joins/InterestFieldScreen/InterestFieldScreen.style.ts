import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const interestFieldScreenStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: 'column',
  },
  fieldInfomation: {
    marginTop: 20,
    width: 198,
    height: 37,
    marginBottom: 36,
  },
});

export default interestFieldScreenStyles;
