import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import BackButton from 'components/navigator/BackButton';
import { StackMenu } from 'constants/menu';
import { Platform } from 'react-native';
import DatePickScreen from 'screens/eventMap/DatePickScreen/DatePickScreen';
import FieldEventMapScreen from 'screens/eventMap/FieldEventMapScreen/FieldEventMapScreen';
import CategoryEventScreen from 'screens/home/CategoryEventScreen/CategoryEventScreen';
import OpenEventScreen from 'screens/home/OpenEventScreen/OpenEventScreen';
import WishEventScreen from 'screens/home/WishEventScreen/WishEventScreen';
import textStyles from 'styles/textStyles';
import { colors } from 'styles/theme';
import SearchAddressScreen from 'screens/home/SearchAddressScreen/SearchAddressScreen';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventConstants';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          ...Platform.select({
            ios: {
              shadowColor: colors.background,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.2,
            },
            android: {
              elevation: 0,
            },
          }),
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={StackMenu.BottomTabNavigator}
    >
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
      <Stack.Screen
        name={StackMenu.CategoryEvent}
        component={CategoryEventScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: '카테고리',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            ...textStyles.h3,
            color: colors.white,
          },
        }}
      />
      <Stack.Screen
        name={StackMenu.WishEvent}
        component={WishEventScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: '찜한 이벤트',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            ...textStyles.h3,
            color: colors.white,
          },
        }}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.white,
          headerTitle: MENT_OPEN_EVENT.HEADER.SEARCH_ADDRESS,
          headerLeft: BackButton,
        }}
        name={StackMenu.SearchAddress}
        component={SearchAddressScreen}
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
