import {
  StackNavigationOptions,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import BackButton from 'components/navigator/BackButton';
import ExitButton from 'components/navigator/ExitButton/ExitButton';
import { StackMenu } from 'constants/app/menu';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventMessage';
import resetQueryKeys from 'constants/queries/resetQueryKey';
import useRefetchOnFocus from 'hooks/app/useRefetchOnFocus';
import useResetQueries from 'hooks/queries/useResetQueries';
import { Platform } from 'react-native';
import DatePickScreen from 'screens/eventMap/DatePickScreen/DatePickScreen';
import EventApplyScreen from 'screens/events/EventApplyScreen/EventApplyScreen';
import EventCommentScreen from 'screens/events/EventCommentScreen/EventCommentScreen';
import EventDetailScreen from 'screens/events/EventDetailScreen/EventDetailScreen';
import EventSelectScreen from 'screens/events/EventSelectScreen/EventSelectScreen';
import AlertScreen from 'screens/home/AlertScreen/AlertScreen';
import BookmarkEventScreen from 'screens/home/BookmarkEventScreen/BookmarkEventScreen';
import CategoryEventScreen from 'screens/home/CategoryEventScreen/CategoryEventScreen';
import OpenEventScreen from 'screens/home/OpenEventScreen/OpenEventScreen';
import PopularEventScreen from 'screens/home/PopularEventScreen/PopularEventScreen';
import SearchAddressScreen from 'screens/home/SearchAddressScreen/SearchAddressScreen';
import ScrapScreen from 'screens/user/ScrapScreen/ScrapScreen';
import UserCommentScreen from 'screens/user/UserCommentScreen/UserCommentScreen';
import UserInterestResetScreen from 'screens/user/UserInterestResetScreen/UserInterestResetScreen';
import UserPasswordResetScreen from 'screens/user/UserPasswordResetScreen/UserPasswordResetScreen';
import UserProfileEditScreen from 'screens/user/UserProfileEditScreen/UserProfileEditScreen';
import HostConsoleScreen from 'screens/userEvent/HostConsoleScreen/HostConsoleScreen';
import HostLedgerDetailScreen from 'screens/userEvent/HostLedgerDetailScreen/HostLedgerDetailScreen';
import HostLedgerScreen from 'screens/userEvent/HostLedgerScreen/HostLedgerScreen';
import HostQRScanScreen from 'screens/userEvent/HostQRScanScreen/HostQRScanScreen';
import StaffManagementScreen from 'screens/userEvent/StaffManagementScreen/StaffManagementScreen';
import UserQRScreen from 'screens/userEvent/UserQRScreen/UserQRScreen';
import UserTicketScreen from 'screens/userEvent/UserTicketScreen/UserTicketScreen';
import { colors, fonts } from 'styles/theme';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const Navigator = () => {
  const defaultOptions: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerTitleAlign: 'center',
    headerTintColor: colors.white,
    headerTitleStyle: {
      fontFamily: fonts.semibold,
      fontSize: 18,
      lineHeight: 18 * 1.4,
      color: colors.white,
    },
    headerLeft: BackButton,
  };

  const noTextOptions: StackNavigationOptions = {
    ...defaultOptions,
    headerTitleStyle: {
      color: 'transparent',
    },
  };

  const { resetQueries } = useResetQueries();
  useRefetchOnFocus(() => resetQueries(resetQueryKeys.all));

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
          ...noTextOptions,
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
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name={StackMenu.BookmarkEvent}
        component={BookmarkEventScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: '찜한 이벤트',
          ...defaultOptions,
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
          headerTitle: '알림',
          ...defaultOptions,
        }}
        name={StackMenu.Alert}
        component={AlertScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: '인기 이벤트',
          ...defaultOptions,
        }}
        name={StackMenu.PopularEvent}
        component={PopularEventScreen}
      />
      {/* map */}
      <Stack.Screen
        options={{
          headerTitle: '날짜 선택',
          ...defaultOptions,
        }}
        name={StackMenu.DatePick}
        component={DatePickScreen}
      />

      {/* Event */}
      <Stack.Screen
        options={{
          ...noTextOptions,
        }}
        name={StackMenu.EventDetail}
        component={EventDetailScreen}
      />
      <Stack.Screen
        options={{
          ...noTextOptions,
        }}
        name={StackMenu.EventSelect}
        component={EventSelectScreen}
      />
      <Stack.Screen
        options={{
          ...noTextOptions,
        }}
        name={StackMenu.EventApply}
        component={EventApplyScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: '댓글',
          ...defaultOptions,
        }}
        name={StackMenu.EventComment}
        component={EventCommentScreen}
      />
      {/* user event */}
      <Stack.Screen
        options={{
          ...noTextOptions,
          headerLeft: () => {
            return null;
          },
          headerRight: ExitButton,
        }}
        name={StackMenu.UserTicket}
        component={UserTicketScreen}
      />
      <Stack.Screen
        options={{
          ...noTextOptions,
          headerLeft: () => {
            return null;
          },
          headerRight: ExitButton,
        }}
        name={StackMenu.UserQR}
        component={UserQRScreen}
      />
      {/* host event */}
      <Stack.Screen
        options={{
          headerTitle: '주최 이벤트 관리',
          ...defaultOptions,
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
          ...noTextOptions,
        }}
        name={StackMenu.HostLedger}
        component={HostLedgerScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: '',
          ...defaultOptions,
        }}
        name={StackMenu.HostLedgerDetail}
        component={HostLedgerDetailScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: '스태프 관리',
          ...defaultOptions,
        }}
        name={StackMenu.StaffManagement}
        component={StaffManagementScreen}
      />
      {/* user */}
      <Stack.Screen
        options={{
          headerTitle: '회원 정보 수정',
          ...defaultOptions,
        }}
        name={StackMenu.UserProfileEdit}
        component={UserProfileEditScreen}
      />
      <Stack.Screen
        options={{
          ...noTextOptions,
        }}
        name={StackMenu.UserInterest}
        component={UserInterestResetScreen}
      />
      <Stack.Screen
        options={{
          ...noTextOptions,
        }}
        name={StackMenu.UserComment}
        component={UserCommentScreen}
      />
      <Stack.Screen
        options={{
          ...noTextOptions,
        }}
        name={StackMenu.UserPasswordReset}
        component={UserPasswordResetScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: '찜한 목록',
          ...defaultOptions,
        }}
        name={StackMenu.Scrap}
        component={ScrapScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
