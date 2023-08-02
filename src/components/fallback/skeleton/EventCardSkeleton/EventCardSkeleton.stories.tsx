import { ComponentMeta, ComponentStory } from '@storybook/react';
import EventCard from 'components/home/cards/EventCard/EventCard';
import eventList from 'mocks/lists/eventList';
import { StyleSheet, View } from 'react-native';
import { colors } from 'styles/theme';
import EventCardSkeleton from './EventCardSkeleton';

export default {
  title: 'components/fallback/skeleton/EventCardSkeleton',
  component: EventCardSkeleton,
} as ComponentMeta<typeof EventCardSkeleton>;

const skeletonTestContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: colors.background,
    padding: 40,
  },
});

const SkeletonTestContainer = () => {
  return (
    <>
      <EventCard
        event={eventList[0]}
        handlePress={() => {
          return false;
        }}
      />
      <EventCardSkeleton />
    </>
  );
};

export const EventCardSkeletonTest: ComponentStory<
  typeof EventCardSkeleton
> = () => (
  <View style={skeletonTestContainerStyles.container}>
    <SkeletonTestContainer />
  </View>
);
