import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const joinCompleteScreenStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: 'column',
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 40,
    flexDirection: 'column',
  },
  title: {
    fontSize: 25,
    color: '#FFF',
  },
  myFieldTitle: {
    color: colors.white,
    fontSize: 18,
  },
  myFieldContainer: {
    width: 360,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  myField: {
    color: colors.main,
    fontSize: 18,
    marginRight: 10,
  },
});

export default joinCompleteScreenStyles;
