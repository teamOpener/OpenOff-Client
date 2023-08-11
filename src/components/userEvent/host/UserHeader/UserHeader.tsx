import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { View } from 'react-native';
import ActionButton from '../buttons/ActionButton/ActionButton';
import userHeaderStyles from './UserHeader.style';

const UserHeader = () => {
  return (
    <View style={userHeaderStyles.container}>
      <SpaceLayout direction="row" size={5}>
        <Text>김민지</Text>
        <Text>1995.01.01</Text>
        <Icon name="IconFemale" size={17} fill="error" />
      </SpaceLayout>

      <SpaceLayout direction="row" size={5}>
        <ActionButton label="거절" />
        <ActionButton label="승인" />
      </SpaceLayout>
    </View>
  );
};

export default UserHeader;
