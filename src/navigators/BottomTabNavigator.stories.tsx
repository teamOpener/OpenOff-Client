import { NavigationContainer } from '@react-navigation/native';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomTabNavigator from './BottomTabNavigator';

const CopyApp = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default {
  title: 'screens/BottomTabNavigator',
  component: CopyApp,
} as ComponentMeta<typeof CopyApp>;

export const BottomTabNavigatorTest: ComponentStory<typeof CopyApp> = () => (
  <CopyApp />
);
