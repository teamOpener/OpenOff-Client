import { NavigationContainer } from '@react-navigation/native';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InterestFieldScreen from './InterestFieldScreen';

export default {
  title: '스크린/로그인 & 회원가입/InterestFieldScreen',
  component: InterestFieldScreen,
} as ComponentMeta<typeof InterestFieldScreen>;

export const InterestFieldScreenTest: ComponentStory<
  typeof InterestFieldScreen
> = (args) => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <InterestFieldScreen {...args} />
      </View>
    </NavigationContainer>
  </GestureHandlerRootView>
);
