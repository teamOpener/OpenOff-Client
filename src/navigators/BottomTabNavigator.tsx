import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'components/common/Icon/Icon';
import { BottomTabMenu } from 'constants/app/menu';
import EventMapScreen from 'screens/eventMap/EventMapScreen/EventMapScreen';
import HomeScreen from 'screens/home/HomeScreen/HomeScreen';
import UserScreen from 'screens/user/UserScreen/UserScreen';
import UserEventScreen from 'screens/userEvent/UserEventScreen/UserEventScreen';
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
          borderTopColor: colors.darkGrey,
          borderLeftColor: colors.darkGrey,
          borderRightColor: colors.darkGrey,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          overflow: 'hidden',
          position: 'absolute',
          bottom: 0,
          left: -1,
          right: -1,
          paddingTop: 6,
        },
      }}
    >
      <Tab.Screen
        name={BottomTabMenu.Home}
        component={HomeScreen}
        options={{
          headerShown: false,
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
      <Tab.Screen
        name={BottomTabMenu.UserEvent}
        component={UserEventScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: '내 이벤트',
          headerTintColor: colors.white,
          tabBarLabel: '내 이벤트',
          tabBarLabelStyle: {
            ...textStyles.caption,
          },
          tabBarIcon: ({ focused }) =>
            Icon({
              name: 'IconTicket',
              fill: focused ? 'white' : 'darkGrey',
              size: 20,
            }),
        }}
      />
      <Tab.Screen
        name={BottomTabMenu.User}
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarLabel: '마이페이지',
          tabBarLabelStyle: {
            ...textStyles.caption,
          },
          tabBarIcon: ({ focused }) =>
            Icon({
              name: 'IconUser',
              fill: focused ? 'white' : 'darkGrey',
              size: 20,
            }),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
