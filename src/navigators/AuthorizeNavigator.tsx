import { createStackNavigator } from '@react-navigation/stack';
import UserInfoStatus from 'constants/join';
import { AuthorizeMenu } from 'constants/menu';
import { Reducer, useReducer } from 'react';
import LoginScreen from 'screens/authorize/LoginScreen/LoginScreen';
import { Action, JoinInfo } from 'types/join';

const Stack = createStackNavigator();

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

const AuthorizeNavigator = () => {
  const initialState = {
    name: '',
    birth: '',
    agreeToTerm: '',
    phoneNumber: '',
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
        headerShown: false,
      }}
    >
      <Stack.Screen name={AuthorizeMenu.Login}>
        {() => <LoginScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthorizeNavigator;
