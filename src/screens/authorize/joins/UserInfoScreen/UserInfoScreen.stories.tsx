import { NavigationContainer } from '@react-navigation/native';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import UserInfoScreen from './UserInfoScreen';

export default {
  title: '스크린/로그인 & 회원가입/UserInfoScreen',
  component: UserInfoScreen,
} as ComponentMeta<typeof UserInfoScreen>;

export const UserInfoScreenTest: ComponentStory<typeof UserInfoScreen> = (
  args,
) => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <UserInfoScreen {...args} />
      </View>
    </NavigationContainer>
  </GestureHandlerRootView>
);
