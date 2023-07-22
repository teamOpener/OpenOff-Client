import { Coordinate } from 'types/event';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Field } from './group';

export type AuthStackParamList = {
  Login: undefined;
  AgreeToTerm: undefined;
  JoinComplete: undefined;
  PhoneCertification: undefined;
  EmailPassword: undefined;
  EmailPasswordFind: undefined;
  Nickname: undefined;
  UserInfo: undefined;
  BirthDay: undefined;
  InterestField: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  EventMap: undefined;
  UserEvent: undefined;
  User: undefined;
};

export type BottomTabNavigationScreenParams =
  NavigatorScreenParams<BottomTabParamList>;

export type RootStackParamList = {
  BottomTabNavigator: BottomTabNavigationScreenParams;
  DatePick: undefined;
  FieldEventMap: {
    field: Field;
    coordinate: Coordinate;
  };
  AddEvent: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<BottomTabParamList>
>;
