import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Coordinate } from 'types/event';
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
  EventMap: {
    eventId?: string;
  };
  UserEvent: undefined;
  User: undefined;
};

export type BottomTabNavigationScreenParams =
  NavigatorScreenParams<BottomTabParamList>;

export type RootStackParamList = {
  BottomTabNavigator: BottomTabNavigationScreenParams;
  DatePick: undefined;
  OpenEvent: undefined;
  FieldEventMap: {
    field: Field;
    coordinate: Coordinate;
  };
  CategoryEvent: {
    fieldValue: string;
  };
  WishEvent: undefined;
  PopularEvent: undefined;
  Alert: undefined;
  EventDetail: {
    id: number;
  };
  EventSelect: {
    id: number;
  };
  EventApply: {
    id: number;
    idx: number;
  };
  SearchAddress: undefined;
  UserTicket: {
    eventId: number;
  };
  UserQR: {
    eventId: number;
    ticketId: string;
  };
  HostConsole: {
    eventId: number;
  };
  HostQRScan: {
    eventId: number;
    eventIndex: number;
  };
  HostLedger: {
    eventId: number;
    eventIndex: number;
  };
  HostLedgerDetail: {
    ledgerId: number;
  };
  HostAlarm: {
    eventId: number;
    eventIndex: number;
  };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<BottomTabParamList>
>;
