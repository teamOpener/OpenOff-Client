import Text from 'components/common/Text/Text';
import { View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/apps/menu';

type EventSelectScreenRouteProp = RouteProp<RootStackParamList, 'EventSelect'>;

const EventSelectScreen = () => {
  const { params } = useRoute<EventSelectScreenRouteProp>();

  return (
    <View>
      <Text>EventSelectScreen</Text>
    </View>
  );
};

export default EventSelectScreen;
