import { ComponentMeta, ComponentStory } from '@storybook/react';
import EventRowCard from 'components/home/cards/EventRowCard/EventRowCard';
import eventList from 'mocks/lists/eventList';
import { StyleSheet, View } from 'react-native';
import { colors } from 'styles/theme';
import EventRowCardSkeleton from './EventRowCardSkeleton';

export default {
  title: 'components/suspense/skeleton/EventRowCardSkeleton',
  component: EventRowCardSkeleton,
} as ComponentMeta<typeof EventRowCardSkeleton>;

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
      <EventRowCard event={eventList[0]} />
      <EventRowCardSkeleton />
    </>
  );
};

export const EventRowCardSkeletonTest: ComponentStory<
  typeof EventRowCardSkeleton
> = () => (
  <View style={skeletonTestContainerStyles.container}>
    <SkeletonTestContainer />
  </View>
);
