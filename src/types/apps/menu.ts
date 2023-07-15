import { Coordinate } from 'types/event';
import { Field } from './group';

export type AuthStackParamList = {
  Login: undefined;
  AgreeToTerm: undefined;
  JoinComplete: undefined;
  PhoneCertification: undefined;
  EmailPassword: undefined;
  EmailPasswordFind: undefined;
  NickName: undefined;
  UserInfo: undefined;
  BirthDay: undefined;
  InterestField: undefined;
};

export type RootStackParamList = {
  BottomTabNavigator: undefined;
  DatePick: undefined;
  FieldEventMap: {
    field: Field;
    coordinate: Coordinate;
  };
};
