import { ComponentMeta, ComponentStory } from '@storybook/react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import UserInfoScreen from './UserInfoScreen';

export default {
  title: '스크린/로그인 & 회원가입/UserInfoScreen',
  component: UserInfoScreen,
} as ComponentMeta<typeof UserInfoScreen>;

export const UserInfoScreenTest: ComponentStory<typeof UserInfoScreen> = (
  args,
) => (
  <View style={{ flex: 1, backgroundColor: colors.background }}>
    <UserInfoScreen {...args} />
  </View>
);
