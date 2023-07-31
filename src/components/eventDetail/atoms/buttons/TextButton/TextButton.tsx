import { TouchableOpacity } from 'react-native';
import Text from 'components/common/Text/Text';

interface Props {
  label: string;
  onPress: () => void;
}

const TextButton = ({ label, onPress }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Text variant="body3" color="grey">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
