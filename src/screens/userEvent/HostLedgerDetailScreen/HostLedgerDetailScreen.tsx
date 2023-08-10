import Text from 'components/common/Text/Text';
import { StackMenu } from 'constants/menu';
import useRouteParams from 'hooks/navigator/useRouteParams';
import { useEffect } from 'react';
import { View } from 'react-native';

const HostLedgerDetailScreen = () => {
  const params = useRouteParams<StackMenu.HostLedgerDetail>();

  useEffect(() => {
    console.log(params?.eventId);
  }, [params]);

  return (
    <View>
      <Text>명단상세보기</Text>
    </View>
  );
};

export default HostLedgerDetailScreen;
