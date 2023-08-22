import { useEffect } from 'react';
import { View } from 'react-native';
import Text from 'components/common/Text/Text';
import { StackMenu } from 'constants/menu';
import useRouteParams from 'hooks/navigator/useRouteParams';

const StaffManagementScreen = () => {
  const params = useRouteParams<StackMenu.StaffManagement>();

  useEffect(() => {
    console.log(params?.eventInfoId);
  }, [params]);

  return (
    <View>
      <Text>스태프 관리</Text>
    </View>
  );
};

export default StaffManagementScreen;
