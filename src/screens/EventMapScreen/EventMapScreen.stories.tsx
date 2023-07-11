import { ComponentMeta, ComponentStory } from '@storybook/react';
import EventMapScreen from './EventMapScreen';

export default {
  title: 'screens/EventMapScreen',
  component: EventMapScreen,
} as ComponentMeta<typeof EventMapScreen>;

export const EventMapScreenTest: ComponentStory<typeof EventMapScreen> = () => (
  <EventMapScreen />
);
