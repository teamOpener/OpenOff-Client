import { ComponentMeta, ComponentStory } from '@storybook/react';
import AlertCard from 'components/home/cards/AlertCard/AlertCard';
import alertList from 'mocks/lists/alertList';
import { StyleSheet, View } from 'react-native';
import { colors } from 'styles/theme';
import AlertCardSkeleton from './AlertCardSkeleton';

export default {
  title: 'components/fallback/skeleton/AlertCardSkeleton',
  component: AlertCardSkeleton,
} as ComponentMeta<typeof AlertCardSkeleton>;

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
      <AlertCard alert={alertList[0]} />
      <AlertCardSkeleton />
    </>
  );
};

export const AlertCardSkeletonTest: ComponentStory<
  typeof AlertCardSkeleton
> = () => (
  <View style={skeletonTestContainerStyles.container}>
    <SkeletonTestContainer />
  </View>
);
