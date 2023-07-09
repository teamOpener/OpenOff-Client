import { Dimensions, StyleSheet } from 'react-native';

const joinButtonStyle = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 20,
    left: Dimensions.get('window').width - 50,
  },
  container: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default joinButtonStyle;
