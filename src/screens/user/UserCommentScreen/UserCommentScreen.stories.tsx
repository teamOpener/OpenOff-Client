import { ComponentMeta, ComponentStory } from '@storybook/react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import UserCommentScreen from './UserCommentScreen';

export default {
  title: 'screens/UserCommentScreen',
  component: UserCommentScreen,
} as ComponentMeta<typeof UserCommentScreen>;

export const UserCommentScreenTest: ComponentStory<
  typeof UserCommentScreen
> = () => (
  // eslint-disable-next-line react-native/no-inline-styles
  <View style={{ flex: 1, backgroundColor: colors.background }}>
    <UserCommentScreen />
  </View>
);
