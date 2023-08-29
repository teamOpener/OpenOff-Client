import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import BackToHomeButton from 'components/authorize/buttons/BackToHomeButton/BackToHomeButton';
import BackButton from 'components/navigator/BackButton';
import { GenderType, UserInfoStatus } from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import React, { Reducer, useReducer } from 'react';
import { Platform } from 'react-native';
import EmailPasswordFindScreen from 'screens/authorize/finds/EmailPasswordFindScreen/EmailPasswordFindScreen';
import AgreeToTermScreen from 'screens/authorize/joins/AgreeToTermScreen/AgreeToTermScreen';
import EmailPasswordScreen from 'screens/authorize/joins/EmailPasswordScreen/EmailPasswordScreen';
import InterestFieldScreen from 'screens/authorize/joins/InterestFieldScreen/InterestFieldScreen';
import JoinCompleteScreen from 'screens/authorize/joins/JoinCompleteScreen/JoinCompleteScreen';
import NicknameScreen from 'screens/authorize/joins/NickNameScreen/NickNameScreen';
import PhoneCertificationScreen from 'screens/authorize/joins/PhoneCertificationScreen/PhoneCertificationScreen';
import UserInfoScreen from 'screens/authorize/joins/UserInfoScreen/UserInfoScreen';
import LoginScreen from 'screens/authorize/logins/LoginScreen/LoginScreen';
import textStyles from 'styles/textStyles';
import { colors } from 'styles/theme';
import { Action, JoinInfo } from 'types/join';

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
    default:
      return state;
  }
};

const AuthorizeNavigator = () => {
  const initialState = {
    username: '',
    birth: '',
    agreeToTerm: '',
    phoneNumber: '',
    nickname: '',
    gender: GenderType.MAN,
    emailAddress: '',
    password: '',
    interestField: [],
  };
  const [state, dispatch] = useReducer<Reducer<JoinInfo, Action>>(
    userInfoReducer,
    initialState,
  );
  const authorizeScreenOption = {
    ...TransitionPresets.SlideFromRightIOS,
    cardStyle: {
      backgroundColor: colors.background,
    },
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
    headerTintColor: colors.white,
  };
  return (
    <Stack.Navigator
      initialRouteName={AuthorizeMenu.Login}
      screenOptions={authorizeScreenOption}
    >
      <Stack.Screen
        options={{
          headerTitle: '',
        }}
        name={AuthorizeMenu.Login}
      >
        {() => <LoginScreen dispatch={dispatch} />}
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
        {() => <AgreeToTermScreen dispatch={dispatch} />}
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

export default AuthorizeNavigator;
