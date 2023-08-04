import { useEffect } from 'react';
import { View } from 'react-native';
import Text from 'components/common/Text/Text';
import { StackMenu } from 'constants/menu';
import useRouteParams from 'hooks/navigator/useRouteParams';

const HostAlarmScreen = () => {
  const params = useRouteParams<StackMenu.HostAlarm>();

  useEffect(() => {
    console.log(params?.eventId, params?.eventIndex);
  }, [params]);

  return (
    <View>
      <Text>알림 전송</Text>
    </View>
  );
};

export default HostAlarmScreen;
