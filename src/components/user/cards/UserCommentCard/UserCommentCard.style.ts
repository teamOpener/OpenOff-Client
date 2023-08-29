import { StyleSheet } from 'react-native';

const userCommentCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  baseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  commentInfo: {
    gap: 3,
  },
});

export default userCommentCardStyles;
