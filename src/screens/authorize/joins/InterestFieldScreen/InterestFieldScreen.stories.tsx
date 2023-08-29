import { ComponentMeta, ComponentStory } from '@storybook/react';
import { View } from 'react-native';
import InterestFieldScreen from './InterestFieldScreen';

export default {
  title: '스크린/로그인 & 회원가입/InterestFieldScreen',
  component: InterestFieldScreen,
} as ComponentMeta<typeof InterestFieldScreen>;

export const InterestFieldScreenTest: ComponentStory<
  typeof InterestFieldScreen
> = (args) => (
  <View style={{ flex: 1 }}>
    <InterestFieldScreen {...args} />
  </View>
);
