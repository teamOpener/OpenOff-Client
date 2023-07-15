import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const userInfoScreenStyles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  titleContainer: {
    width: 350,
    marginTop: 20,
    marginBottom: 50,
  },
  title: {
    width: 230,
  },
  detailUserInfo: {
    flexDirection: 'row',
    width: 360,
    alignItems: 'center',
  },
});

export default userInfoScreenStyles;
