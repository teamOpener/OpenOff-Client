import { ComponentMeta, ComponentStory } from '@storybook/react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import ScrapScreen from './ScrapScreen';

export default {
  title: 'screens/ScrapScreen',
  component: ScrapScreen,
} as ComponentMeta<typeof ScrapScreen>;

export const ScrapScreenTest: ComponentStory<typeof ScrapScreen> = () => (
  <View style={{ backgroundColor: colors.background }}>
    <ScrapScreen />
  </View>
);
