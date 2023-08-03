import { ComponentMeta, ComponentStory } from '@storybook/react';
import { View } from 'react-native';
import UserInfoScreen from './UserInfoScreen';

export default {
  title: '스크린/로그인 & 회원가입/UserInfoScreen',
  component: UserInfoScreen,
} as ComponentMeta<typeof UserInfoScreen>;

export const UserInfoScreenTest: ComponentStory<typeof UserInfoScreen> = (
  args,
) => (
  <View style={{ flex: 1 }}>
    <UserInfoScreen {...args} />
  </View>
);
