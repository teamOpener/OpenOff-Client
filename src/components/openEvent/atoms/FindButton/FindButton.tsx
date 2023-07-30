import { TouchableOpacity } from 'react-native';
import Text from 'components/common/Text/Text';
import findButtonStyles from './FindButton.style';

interface Props {
  onPress: () => void;
}

const FindButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      style={findButtonStyles.container}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <Text style={findButtonStyles.text}>주소 검색</Text>
    </TouchableOpacity>
  );
};

export default FindButton;
