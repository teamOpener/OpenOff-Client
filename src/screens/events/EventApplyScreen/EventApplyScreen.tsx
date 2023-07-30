import Text from 'components/common/Text/Text';
import { View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/apps/menu';

type EventApplyScreenRouteProp = RouteProp<RootStackParamList, 'EventApply'>;

const EventApplyScreen = () => {
  const { params } = useRoute<EventApplyScreenRouteProp>();

  return (
    <View>
      <Text>EventApplyScreen</Text>
    </View>
  );
};

export default EventApplyScreen;
