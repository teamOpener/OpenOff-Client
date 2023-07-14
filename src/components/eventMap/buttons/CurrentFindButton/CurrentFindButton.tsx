import Icon from 'components/common/Icon/Icon';
import { TouchableOpacity } from 'react-native';
import Text from '../../../common/Text/Text';
import currentFindButtonStyles from './CurrentFindButton.style';

interface Props {
  handlePress: () => void;
  isFindActive: boolean;
}

const CurrentFindButton = ({ isFindActive, handlePress }: Props) => {
  return (
    isFindActive && (
      <TouchableOpacity
        style={currentFindButtonStyles.container}
        onPress={handlePress}
      >
        <Icon name="IconSend" fill="main" size={20} />
        <Text color="main" variant="body1">
          현 지도에서 검색
        </Text>
      </TouchableOpacity>
    )
  );
};

export default CurrentFindButton;
