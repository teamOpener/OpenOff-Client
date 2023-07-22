import { useNavigation } from '@react-navigation/native';
import {
  MainTabNavigationProp,
  RootStackNavigationProp,
} from 'types/apps/menu';

const useNavigator = () => {
  const stackNavigation = useNavigation<RootStackNavigationProp>();
  const tabNavigation = useNavigation<MainTabNavigationProp>();

  return { stackNavigation, tabNavigation };
};

export default useNavigator;
