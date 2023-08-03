import { ComponentMeta, ComponentStory } from '@storybook/react';
import BottomTabNavigator from './BottomTabNavigator';

const CopyApp = () => {
  return <BottomTabNavigator />;
};

export default {
  title: 'screens/BottomTabNavigator',
  component: CopyApp,
} as ComponentMeta<typeof CopyApp>;

export const BottomTabNavigatorTest: ComponentStory<typeof CopyApp> = () => (
  <CopyApp />
);
