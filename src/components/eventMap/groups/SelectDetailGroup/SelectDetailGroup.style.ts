import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const selectDetailGroupStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  detailTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  boxLine: {
    marginTop: 15,
    marginBottom: 20,
    height: 1,
    backgroundColor: colors.darkGrey,
  },
  controlContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 40,
  },
});

export default selectDetailGroupStyles;
