import {
  StackNavigationOptions,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import BackButton from 'components/navigator/BackButton';
import ExitButton from 'components/navigator/ExitButton/ExitButton';
import { AuthorizeMenu, StackMenu } from 'constants/app/menu';
import MENT_NAVIGATOR from 'constants/navigator/navigatorMessage';
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
import NicknameScreen from 'screens/authorize/joins/NickNameScreen/NickNameScreen';
import EmailPasswordFindScreen from 'screens/authorize/finds/EmailPasswordFindScreen/EmailPasswordFindScreen';
import JoinCompleteScreen from 'screens/authorize/joins/JoinCompleteScreen/JoinCompleteScreen';
import BackToHomeButton from 'components/authorize/buttons/BackToHomeButton/BackToHomeButton';
import InterestFieldScreen from 'screens/authorize/joins/InterestFieldScreen/InterestFieldScreen';
import UserInfoScreen from 'screens/authorize/joins/UserInfoScreen/UserInfoScreen';
import LoginScreen from 'screens/authorize/logins/LoginScreen/LoginScreen';
import EmailPasswordScreen from 'screens/authorize/joins/EmailPasswordScreen/EmailPasswordScreen';
import AgreeToTermScreen from 'screens/authorize/joins/AgreeToTermScreen/AgreeToTermScreen';
import PhoneCertificationScreen from 'screens/authorize/joins/PhoneCertificationScreen/PhoneCertificationScreen';
import textStyles from 'styles/textStyles';
import { GenderType, UserInfoStatus } from 'constants/authorize/join';
import { Action, JoinInfo } from 'types/join';
import { Reducer, useReducer } from 'react';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const userInfoReducer = (state: JoinInfo, action: Action): JoinInfo => {
  switch (action.type) {
    case UserInfoStatus.SET_NAME:
      return { ...state, username: action.username };
    case UserInfoStatus.SET_BIRTH:
      return { ...state, birth: action.birth };
    case UserInfoStatus.SET_AGREE_TO_TERM:
      return { ...state, agreeToTerm: action.term };
    case UserInfoStatus.SET_PHONE_NUMBER:
      return { ...state, phoneNumber: action.phoneNumber };
    case UserInfoStatus.SET_GENDER:
      return { ...state, gender: action.gender };
    case UserInfoStatus.SET_NICK_NAME:
      return { ...state, nickname: action.nickname };
    case UserInfoStatus.SET_EMAIL_ADDRESS_PASSWORD:
      return {
        ...state,
        emailAddress: action.emailPassword.email,
        password: action.emailPassword.password,
      };
    case UserInfoStatus.SET_INTEREST_FIELD:
      return { ...state, interestField: action.interestField };
    case UserInfoStatus.SET_ACCOUNT_TYPE:
      return {
        ...state,
        accountType: action.accountType,
      };
    default:
      return state;
  }
};

const StackNavigator = () => {
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

  const initialState: JoinInfo = {
    username: '',
    birth: '',
    agreeToTerm: '',
    phoneNumber: '',
    nickname: '',
    gender: GenderType.MAN,
    emailAddress: '',
    password: '',
    interestField: [],
    accountType: 'NORMAL',
  };

  const [state, dispatch] = useReducer<Reducer<JoinInfo, Action>>(
    userInfoReducer,
    initialState,
  );

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
          headerTitle: MENT_NAVIGATOR.HEADER_TITLE.CATEGORY_EVENT,
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name={StackMenu.BookmarkEvent}
        component={BookmarkEventScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: MENT_NAVIGATOR.HEADER_TITLE.BOOKMARK_EVENT,
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.white,
          headerTitle: MENT_NAVIGATOR.HEADER_TITLE.SEARCH_ADDRESS,
          headerLeft: BackButton,
        }}
        name={StackMenu.SearchAddress}
        component={SearchAddressScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: MENT_NAVIGATOR.HEADER_TITLE.ALERT,
          ...defaultOptions,
        }}
        name={StackMenu.Alert}
        component={AlertScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: MENT_NAVIGATOR.HEADER_TITLE.POPULAR_EVENT,
          ...defaultOptions,
        }}
        name={StackMenu.PopularEvent}
        component={PopularEventScreen}
      />
      {/* map */}
      <Stack.Screen
        options={{
          headerTitle: MENT_NAVIGATOR.HEADER_TITLE.DATE_PICK,
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
          headerTitle: MENT_NAVIGATOR.HEADER_TITLE.EVENT_COMMENT,
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
          headerTitle: MENT_NAVIGATOR.HEADER_TITLE.HOST_CONSOLE,
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
          headerTitle: MENT_NAVIGATOR.HEADER_TITLE.HOST_QR,
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
          headerTitle: MENT_NAVIGATOR.HEADER_TITLE.STAFF_MANAGEMENT,
          ...defaultOptions,
        }}
        name={StackMenu.StaffManagement}
        component={StaffManagementScreen}
      />
      {/* user */}
      <Stack.Screen
        options={{
          headerTitle: MENT_NAVIGATOR.HEADER_TITLE.USER_PROFILE_EDIT,
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
          headerTitle: MENT_NAVIGATOR.HEADER_TITLE.SCRAP,
          ...defaultOptions,
        }}
        name={StackMenu.Scrap}
        component={ScrapScreen}
      />
      {/** authorize */}
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: BackButton,
        }}
        name={AuthorizeMenu.Login}
      >
        {() => <LoginScreen state={state} dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: BackButton,
        }}
        name={AuthorizeMenu.EmailPassword}
      >
        {() => <EmailPasswordScreen dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => null,
        }}
        name={AuthorizeMenu.AgreeToTerm}
      >
        {() => <AgreeToTermScreen state={state} dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: BackButton,
        }}
        name={AuthorizeMenu.PhoneCertification}
      >
        {() => <PhoneCertificationScreen dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: BackButton,
        }}
        name={AuthorizeMenu.Nickname}
      >
        {() => <NicknameScreen dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: BackButton,
        }}
        name={AuthorizeMenu.UserInfo}
      >
        {() => <UserInfoScreen state={state} dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: BackButton,
        }}
        name={AuthorizeMenu.InterestField}
      >
        {() => <InterestFieldScreen state={state} dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerTitle: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => <BackToHomeButton />,
        }}
        name={AuthorizeMenu.JoinComplete}
      >
        {() => <JoinCompleteScreen state={state} />}
      </Stack.Screen>
      <Stack.Screen
        name={AuthorizeMenu.EmailPasswordFind}
        options={{
          headerLeft: BackButton,
          headerStyle: {
            backgroundColor: colors.background,
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
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            ...textStyles.h3,
            color: colors.white,
          },
        }}
      >
        {() => <EmailPasswordFindScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigator;
