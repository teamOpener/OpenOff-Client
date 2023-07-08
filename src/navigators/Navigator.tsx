import { createStackNavigator } from '@react-navigation/stack';
import { StackMenu } from 'constants/menu';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={StackMenu.BottomTabNavigator}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={StackMenu.BottomTabNavigator}
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
