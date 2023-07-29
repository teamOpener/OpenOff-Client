import { ComponentMeta, ComponentStory } from '@storybook/react';
import eventList from 'data/lists/eventList';
import { StyleSheet, View } from 'react-native';
import { colors } from 'styles/theme';
import EventRowCard from './EventRowCard';

const eventRowBackground = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default {
  title: 'components/home/cards/EventRowCard',
  component: EventRowCard,
} as ComponentMeta<typeof EventRowCard>;

export const EventRowCardTest: ComponentStory<typeof EventRowCard> = (args) => (
  <View style={eventRowBackground.container}>
    <EventRowCard {...args} />
  </View>
);

EventRowCardTest.args = {
  event: eventList[0],
};
