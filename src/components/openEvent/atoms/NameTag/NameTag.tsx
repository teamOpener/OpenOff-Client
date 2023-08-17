import { TouchableOpacity } from 'react-native';
import Text from 'components/common/Text/Text';
import nameTagStyles from './NameTag.style';

interface Props {
  label: string;
  onPress: () => void;
}

const NameTag = ({ label, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={nameTagStyles.container}
      onPress={onPress}
    >
      <Text style={nameTagStyles.text}>{`@ ${label}`}</Text>
    </TouchableOpacity>
  );
};

export default NameTag;
