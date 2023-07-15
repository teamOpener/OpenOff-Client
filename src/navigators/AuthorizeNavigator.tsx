import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import UserInfoStatus from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import React, { Reducer, useReducer } from 'react';
import { Platform } from 'react-native';
import AgreeToTermScreen from 'screens/authorize/joins/AgreeToTermScreen/AgreeToTermScreen';
import EmailPasswordFindScreen from 'screens/authorize/finds/EmailPasswordFindScreen/EmailPasswordFindScreen';
import EmailPasswordScreen from 'screens/authorize/joins/EmailPasswordScreen/EmailPasswordScreen';
import InterestFieldScreen from 'screens/authorize/joins/InterestFieldScreen/InterestFieldScreen';
import JoinCompleteScreen from 'screens/authorize/joins/JoinCompleteScreen/JoinCompleteScreen';
import LoginScreen from 'screens/authorize/logins/LoginScreen/LoginScreen';
import NickNameScreen from 'screens/authorize/joins/NickNameScreen/NickNameScreen';
import PhoneCertificationScreen from 'screens/authorize/joins/PhoneCertificationScreen/PhoneCertificationScreen';
import UserInfoScreen from 'screens/authorize/joins/UserInfoScreen/UserInfoScreen';
import { colors } from 'styles/theme';
import { Action, JoinInfo } from 'types/join';

const Stack = createStackNavigator();

interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const userInfoReducer = (state: JoinInfo, action: Action): JoinInfo => {
  switch (action.type) {
    case UserInfoStatus.SET_NAME:
      return { ...state, name: action.name };
    case UserInfoStatus.SET_BIRTH:
      return { ...state, birth: action.birth };
    case UserInfoStatus.SET_AGREE_TO_TERM:
      return { ...state, agreeToTerm: action.term };
    case UserInfoStatus.SET_PHONE_NUMBER:
      return { ...state, phoneNumber: action.phoneNumber };
    case UserInfoStatus.SET_GENDER:
      return { ...state, gender: action.gender };
    case UserInfoStatus.SET_NICK_NAME:
      return { ...state, nickName: action.nickName };
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

const AuthorizeNavigator = ({ setIsLogin }: Props) => {
  const initialState = {
    name: '',
    birth: '',
    agreeToTerm: '',
    phoneNumber: '',
    nickName: '',
    gender: '',
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
    headerTitle: '',
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
      <Stack.Screen name={AuthorizeMenu.Login}>
        {() => <LoginScreen setIsLogin={setIsLogin} />}
      </Stack.Screen>
      <Stack.Screen name={AuthorizeMenu.EmailPassword}>
        {() => <EmailPasswordScreen dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen name={AuthorizeMenu.AgreeToTerm}>
        {() => <AgreeToTermScreen dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen name={AuthorizeMenu.PhoneCertification}>
        {() => <PhoneCertificationScreen dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen name={AuthorizeMenu.NickName}>
        {() => <NickNameScreen dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen name={AuthorizeMenu.UserInfo}>
        {() => <UserInfoScreen dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen name={AuthorizeMenu.InterestField}>
        {() => <InterestFieldScreen dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen name={AuthorizeMenu.JoinComplete}>
        {() => <JoinCompleteScreen state={state} setIsLogin={setIsLogin} />}
      </Stack.Screen>
      <Stack.Screen name={AuthorizeMenu.EmailPasswordFind}>
        {() => <EmailPasswordFindScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthorizeNavigator;
