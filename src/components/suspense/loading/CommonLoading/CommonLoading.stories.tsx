import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { colors } from 'styles/theme';
import CommonLoading from './CommonLoading';

export default {
  title: 'components/fallback/skeleton/CommonLoading',
  component: CommonLoading,
} as ComponentMeta<typeof CommonLoading>;

const skeletonTestContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

const LoadingTestContainer = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <>
      <Button
        title="로딩 오픈"
        onPress={() => {
          setIsActive(true);
          setTimeout(() => {
            setIsActive(false);
          }, 3000);
        }}
      />
      <CommonLoading isActive={isActive} />
    </>
  );
};

export const CommonLoadingTest: ComponentStory<typeof CommonLoading> = () => (
  <View style={skeletonTestContainerStyles.container}>
    <LoadingTestContainer />
  </View>
);
