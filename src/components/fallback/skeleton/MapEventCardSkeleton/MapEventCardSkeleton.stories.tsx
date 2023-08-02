import { ComponentMeta, ComponentStory } from '@storybook/react';
import MapEventCard from 'components/eventMap/cards/MapEventCard/MapEventCard';
import eventList from 'mocks/lists/eventList';
import { StyleSheet, View } from 'react-native';
import { colors } from 'styles/theme';
import MapEventCardSkeleton from './MapEventCardSkeleton';

export default {
  title: 'components/fallback/skeleton/MapEventCardSkeleton',
  component: MapEventCardSkeleton,
} as ComponentMeta<typeof MapEventCardSkeleton>;

const skeletonTestContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: colors.background,
  },
});

const SkeletonTestContainer = () => {
  return (
    <>
      <MapEventCard event={eventList[0]} />
      <MapEventCardSkeleton />
    </>
  );
};

export const MapEventCardSkeletonTest: ComponentStory<
  typeof MapEventCardSkeleton
> = () => (
  <View style={skeletonTestContainerStyles.container}>
    <SkeletonTestContainer />
  </View>
);
