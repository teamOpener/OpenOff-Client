import { StyleSheet } from 'react-native';
import { fonts } from 'styles/theme';

const userHeaderStyles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    justifyContent: 'space-between',
    gap: 10,
  },
  nameText: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 23.87,
  },
});

export default userHeaderStyles;
