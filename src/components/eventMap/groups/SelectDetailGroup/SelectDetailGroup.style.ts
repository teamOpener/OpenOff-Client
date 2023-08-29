import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const selectDetailGroupStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 10,
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
    width: Dimensions.get('window').width - 20,
    height: 1,
    backgroundColor: colors.darkGrey,
  },
  controlContainer: {
    width: Dimensions.get('window').width - 20,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 40,
  },
});

export default selectDetailGroupStyles;
