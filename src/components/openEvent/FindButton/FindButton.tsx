import { TouchableOpacity } from 'react-native';
import Text from 'components/common/Text/Text';
import findButtonStyles from './FindButton.style';

const FindButton = () => {
  return (
    <TouchableOpacity style={findButtonStyles.container} activeOpacity={0.6}>
      <Text style={findButtonStyles.text}>주소 검색</Text>
    </TouchableOpacity>
  );
};

export default FindButton;
