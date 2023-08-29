import Icon from 'components/common/Icon/Icon';
import { Pressable } from 'react-native';
import Text from '../../../common/Text/Text';
import currentFieldFindButtonStyles from './CurrentFieldFindButton.style';

interface Props {
  handlePress: () => void;
  isFindActive: boolean;
}

const CurrentFieldFindButton = ({ isFindActive, handlePress }: Props) => {
  return (
    isFindActive && (
      <Pressable
        style={currentFieldFindButtonStyles.container}
        onPress={handlePress}
      >
        <Icon name="IconSend" fill="main" size={20} />
        <Text color="main" variant="body1">
          현 지도에서 검색
        </Text>
      </Pressable>
    )
  );
};

export default CurrentFieldFindButton;
