import { RouteProp, useRoute } from '@react-navigation/native';
import { BottomTabParamList } from 'types/apps/menu';

type ScreenName = keyof BottomTabParamList;

const useTabRoute = <T extends ScreenName>() => {
  const route = useRoute<RouteProp<BottomTabParamList, T>>();

  return route;
};

export default useTabRoute;
