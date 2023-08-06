import { ComponentMeta, ComponentStory } from '@storybook/react';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import UserProfileEditScreen from './UserProfileEditScreen';

export default {
  title: 'screens/UserProfileEditScreen',
  component: UserProfileEditScreen,
} as ComponentMeta<typeof UserProfileEditScreen>;

export const UserProfileEditScreenTest: ComponentStory<
  typeof UserProfileEditScreen
> = () => (
  // eslint-disable-next-line react-native/no-inline-styles
  <View style={{ flex: 1, backgroundColor: colors.background }}>
    <UserProfileEditScreen />
  </View>
);
