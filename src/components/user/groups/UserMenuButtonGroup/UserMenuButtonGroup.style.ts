import { StyleSheet } from 'react-native';

const userMenuButtonGroupStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  menuButton: {
    flex: 1,
    gap: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default userMenuButtonGroupStyles;
