import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PosterCarousel } from 'components/eventDetail/atoms';
import eventList from 'mocks/lists/eventList';
import { StyleSheet, View } from 'react-native';
import { colors } from 'styles/theme';
import PosterCarouselSkeleton from './PosterCarouselSkeleton';

export default {
  title: 'components/suspense/skeleton/PosterCarouselSkeleton',
  component: PosterCarouselSkeleton,
} as ComponentMeta<typeof PosterCarouselSkeleton>;

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
      <PosterCarousel
        images={[{ imageUrl: eventList[0].images[0], isMain: false }]}
      />
      <PosterCarouselSkeleton />
    </>
  );
};

export const PosterCarouselSkeletonTest: ComponentStory<
  typeof PosterCarouselSkeleton
> = () => (
  <View style={skeletonTestContainerStyles.container}>
    <SkeletonTestContainer />
  </View>
);
