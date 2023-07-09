import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const interestFieldScreenStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 25,
    color: '#FFF',
    marginTop: 40,
  },
  fieldInfomation: {
    marginTop: 20,
    width: 198,
    height: 37,
    marginBottom: 36,
  },
});

export default interestFieldScreenStyles;
