import { useEffect } from 'react';
import { View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/apps/menu';
import Text from 'components/common/Text/Text';
import { useEventDetail } from 'hooks/queries/event';

type EventDetailScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

const EventDetailScreen = () => {
  const { params } = useRoute<EventDetailScreenRouteProp>();

  const { data: event } = useEventDetail(params.id);

  useEffect(() => {
    console.log(event?.data);
  }, [event]);

  return (
    <View>
      <Text>EventDetailScreen</Text>
    </View>
  );
};

export default EventDetailScreen;
