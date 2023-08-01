import Text from 'components/common/Text/Text';
import { TouchableOpacity } from 'react-native';
import tabItemStyles from './TabItem.style';

interface Props {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const TabItem = ({ label, isActive, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        tabItemStyles.container,
        isActive && tabItemStyles.activeContainer,
      ]}
      onPress={onPress}
    >
      <Text color={isActive ? 'white' : 'grey'} style={tabItemStyles.text}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TabItem;
