import { StyleSheet } from 'react-native';

const categoryButtonGroupStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  groupContainer: {
    width: 285,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryImage: {
    width: 85,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 5,
  },
  textContainer: {
    width: 85,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(25, 25, 25, 0.70)',
  },
});

export default categoryButtonGroupStyles;
