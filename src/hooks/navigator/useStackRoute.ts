import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/apps/menu';

type ScreenName = keyof RootStackParamList;

const useStackRoute = <T extends ScreenName>() => {
  const route = useRoute<RouteProp<RootStackParamList, T>>();

  return route;
};

export default useStackRoute;
