import { StyleSheet } from 'react-native';

const userInfoScreenStyles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleContainer: {
    width: 350,
    marginTop: 100,
    marginBottom: 50,
  },
  title: {
    width: 230,
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
  },
  detailUserInfo: {
    flexDirection: 'row',
    width: 360,
    alignItems: 'center',
  },
});

export default userInfoScreenStyles;
