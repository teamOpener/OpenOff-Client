import { createStackNavigator } from '@react-navigation/stack';
import { StackMenu } from 'constants/menu';
import DatePickScreen from 'screens/eventMap/DatePickScreen/DatePickScreen';
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
      <Stack.Screen name={StackMenu.DatePick} component={DatePickScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
