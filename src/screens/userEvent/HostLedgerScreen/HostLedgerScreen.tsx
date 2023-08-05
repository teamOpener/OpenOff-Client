import { View } from 'react-native';
import Text from 'components/common/Text/Text';
import { StackMenu } from 'constants/menu';
import useRouteParams from 'hooks/navigator/useRouteParams';

const HostLedgerScreen = () => {
  const params = useRouteParams<StackMenu.HostLedger>();

  return (
    <View>
      <Text>명단관리</Text>
    </View>
  );
};

export default HostLedgerScreen;
