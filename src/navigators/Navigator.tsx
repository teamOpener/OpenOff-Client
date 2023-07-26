import { createStackNavigator } from '@react-navigation/stack';
import { StackMenu } from 'constants/menu';
import DatePickScreen from 'screens/eventMap/DatePickScreen/DatePickScreen';
import textStyles from 'styles/textStyles';
import { colors } from 'styles/theme';
import OpenEventScreen from 'screens/home/OpenEventScreen/OpenEventScreen';
import BackButton from 'components/navigator/BackButton';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName={StackMenu.BottomTabNavigator}>
      <Stack.Screen
        name={StackMenu.BottomTabNavigator}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      {/* home */}
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            color: 'transparent',
          },
          headerLeft: BackButton,
        }}
        name={StackMenu.OpenEvent}
        component={OpenEventScreen}
      />
      {/* map */}
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: '날짜 선택',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            ...textStyles.h3,
            color: colors.white,
          },
        }}
        name={StackMenu.DatePick}
        component={DatePickScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
