import { ComponentMeta, ComponentStory } from '@storybook/react';
import CarouselCard from 'components/home/cards/CarouselCard/CarouselCard';
import advertisementList from 'mocks/lists/advertisementList';
import { StyleSheet, View } from 'react-native';
import { colors } from 'styles/theme';
import CarouselCardSkeleton from './CarouselCardSkeleton';

export default {
  title: 'components/suspense/skeleton/CarouselCardSkeleton',
  component: CarouselCardSkeleton,
} as ComponentMeta<typeof CarouselCardSkeleton>;

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
      <CarouselCard item={advertisementList[0]} index={0} length={0} />
      <CarouselCardSkeleton />
    </>
  );
};

export const CarouselCardSkeletonTest: ComponentStory<
  typeof CarouselCardSkeleton
> = () => (
  <View style={skeletonTestContainerStyles.container}>
    <SkeletonTestContainer />
  </View>
);
