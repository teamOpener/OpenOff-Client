import { CONSTANT_PARTICIPANT } from 'constants/userEvent/participant/participantConstants';
import { StyleSheet } from 'react-native';
import { colors } from 'styles/theme';

const tagGroupStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: CONSTANT_PARTICIPANT.BAR_INITIAL_HEIGHT,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
});

export default tagGroupStyles;
