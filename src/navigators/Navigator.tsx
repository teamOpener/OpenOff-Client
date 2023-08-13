import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import BackButton from 'components/navigator/BackButton';
import { StackMenu } from 'constants/menu';
import { Platform } from 'react-native';
import DatePickScreen from 'screens/eventMap/DatePickScreen/DatePickScreen';
import CategoryEventScreen from 'screens/home/CategoryEventScreen/CategoryEventScreen';
import OpenEventScreen from 'screens/home/OpenEventScreen/OpenEventScreen';
import WishEventScreen from 'screens/home/WishEventScreen/WishEventScreen';
import textStyles from 'styles/textStyles';
import { colors } from 'styles/theme';
import SearchAddressScreen from 'screens/home/SearchAddressScreen/SearchAddressScreen';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventConstants';
import AlertScreen from 'screens/home/AlertScreen/AlertScreen';
import EventDetailScreen from 'screens/events/EventDetailScreen/EventDetailScreen';
import EventSelectScreen from 'screens/events/EventSelectScreen/EventSelectScreen';
import EventApplyScreen from 'screens/events/EventApplyScreen/EventApplyScreen';
import UserTicketScreen from 'screens/userEvent/UserTicketScreen/UserTicketScreen';
import ExitButton from 'components/navigator/ExitButton/ExitButton';
import UserQRScreen from 'screens/userEvent/UserQRScreen/UserQRScreen';
import HostConsoleScreen from 'screens/userEvent/HostConsoleScreen/HostConsoleScreen';
import HostQRScanScreen from 'screens/userEvent/HostQRScanScreen/HostQRScanScreen';
import HostLedgerScreen from 'screens/userEvent/HostLedgerScreen/HostLedgerScreen';
import HostAlarmScreen from 'screens/userEvent/HostAlarmScreen/HostAlarmScreen';
import HostLedgerDetailScreen from 'screens/userEvent/HostLedgerDetailScreen/HostLedgerDetailScreen';
import PopularEventScreen from 'screens/home/PopularEventScreen/PopularEventScreen';
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
          headerLeft: BackButton,
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
          headerLeft: BackButton,
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
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: '알림',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            ...textStyles.h3,
            color: colors.white,
          },
          headerLeft: BackButton,
        }}
        name={StackMenu.Alert}
        component={AlertScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: '인기 이벤트',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            ...textStyles.h3,
            color: colors.white,
          },
          headerLeft: BackButton,
        }}
        name={StackMenu.PopularEvent}
        component={PopularEventScreen}
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
          headerLeft: BackButton,
        }}
        name={StackMenu.DatePick}
        component={DatePickScreen}
      />

      {/* Event */}
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
        name={StackMenu.EventDetail}
        component={EventDetailScreen}
      />
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
        name={StackMenu.EventSelect}
        component={EventSelectScreen}
      />
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
        name={StackMenu.EventApply}
        component={EventApplyScreen}
      />
      {/* user event */}
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            color: 'transparent',
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => {
            // eslint-disable-next-line react/jsx-no-useless-fragment
            return <></>;
          },
          headerRight: ExitButton,
        }}
        name={StackMenu.UserTicket}
        component={UserTicketScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            color: 'transparent',
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => {
            // eslint-disable-next-line react/jsx-no-useless-fragment
            return <></>;
          },
          headerRight: ExitButton,
        }}
        name={StackMenu.UserQR}
        component={UserQRScreen}
      />
      {/* host event */}
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
        name={StackMenu.HostConsole}
        component={HostConsoleScreen}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTintColor: colors.white,
          headerLeft: BackButton,
          headerTitle: '스캔',
        }}
        name={StackMenu.HostQRScan}
        component={HostQRScanScreen}
      />
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
        name={StackMenu.HostLedger}
        component={HostLedgerScreen}
      />
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
        name={StackMenu.HostLedgerDetail}
        component={HostLedgerDetailScreen}
      />
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
        name={StackMenu.HostAlarm}
        component={HostAlarmScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
