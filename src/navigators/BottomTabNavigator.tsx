import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'components/common/Icon/Icon';
import { BottomTabMenu } from 'constants/menu';
import EventMapScreen from 'screens/EventMapScreen/EventMapScreen';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import textStyles from 'styles/textStyles';
import { colors } from 'styles/theme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={BottomTabMenu.Home}
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.darkGrey,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tab.Screen
        name={BottomTabMenu.Home}
        component={HomeScreen}
        options={{
          headerShown: true,
          tabBarLabel: '홈',
          tabBarLabelStyle: {
            ...textStyles.caption,
          },
          tabBarIcon: ({ focused }) =>
            Icon({
              name: 'IconHome',
              fill: focused ? 'white' : 'darkGrey',
              size: 20,
            }),
        }}
      />
      <Tab.Screen
        name={BottomTabMenu.EventMap}
        component={EventMapScreen}
        options={{
          headerShown: false,
          tabBarLabel: '이벤트맵',
          tabBarLabelStyle: {
            ...textStyles.caption,
          },
          tabBarIcon: ({ focused }) =>
            Icon({
              name: 'IconMap',
              fill: focused ? 'white' : 'darkGrey',
              size: 20,
            }),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
