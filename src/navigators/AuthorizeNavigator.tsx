import { createStackNavigator } from '@react-navigation/stack';
import UserInfoStatus from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import React, { Reducer, useReducer } from 'react';
import { Platform } from 'react-native';
import AgreeToTermScreen from 'screens/authorize/AgreeToTermScreen/AgreeToTermScreen';
import EmailPasswordScreen from 'screens/authorize/EmailPasswordScreen/EmailPasswordScreen';
import InterestFieldScreen from 'screens/authorize/InterestFieldScreen/InterestFieldScreen';
import JoinCompleteScreen from 'screens/authorize/JoinCompleteScreen/JoinCompleteScreen';
import LoginScreen from 'screens/authorize/LoginScreen/LoginScreen';
import NickNameScreen from 'screens/authorize/NickNameScreen/NickNameScreen';
import PhoneCertificationScreen from 'screens/authorize/PhoneCertificationScreen/PhoneCertificationScreen';
import UserInfoScreen from 'screens/authorize/UserInfoScreen/UserInfoScreen';
import { colors } from 'styles/theme';
import { Action, JoinInfo } from 'types/join';

const Stack = createStackNavigator();

interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const userInfoReducer = (state: JoinInfo, action: Action): JoinInfo => {
  switch (action.type) {
    case UserInfoStatus.SET_NAME:
      if (typeof action.value === 'object') return state;
      return { ...state, name: action.value };
    case UserInfoStatus.SET_BIRTH:
      if (typeof action.value === 'object') return state;
      return { ...state, birth: action.value };
    case UserInfoStatus.SET_AGREE_TO_TERM:
      if (typeof action.value === 'object') return state;
      return { ...state, agreeToTerm: action.value };
    case UserInfoStatus.SET_PHONE_NUMBER:
      if (typeof action.value === 'object') return state;
      return { ...state, phoneNumber: action.value };
    case UserInfoStatus.SET_GENDER:
      if (typeof action.value === 'object') return state;
      return { ...state, gender: action.value };
    case UserInfoStatus.SET_EMAIL_ADDRESS:
      if (typeof action.value === 'object') return state;
      return { ...state, emailAddress: action.value };
    case UserInfoStatus.SET_PASSWORD:
      if (typeof action.value === 'object') return state;
      return { ...state, password: action.value };
    case UserInfoStatus.SET_INTEREST_FIELD:
      if (typeof action.value === 'string') return state;
      return { ...state, interestField: action.value };
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
    nickname: '',
    gender: '',
    emailAddress: '',
    password: '',
    interestField: [],
  };
  const [state, dispatch] = useReducer<Reducer<JoinInfo, Action>>(
    userInfoReducer,
    initialState,
  );
  return (
    <Stack.Navigator
      initialRouteName={AuthorizeMenu.Login}
      screenOptions={{
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
      }}
    >
      <Stack.Screen name={AuthorizeMenu.Login}>
        {() => <LoginScreen />}
      </Stack.Screen>
      <Stack.Screen name={AuthorizeMenu.AgreeToTerm}>
        {() => <AgreeToTermScreen dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen name={AuthorizeMenu.PhoneCertification}>
        {() => <PhoneCertificationScreen dispatch={dispatch} />}
      </Stack.Screen>
      <Stack.Screen name={AuthorizeMenu.EmailPassword}>
        {() => <EmailPasswordScreen dispatch={dispatch} />}
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
    </Stack.Navigator>
  );
};

export default AuthorizeNavigator;
