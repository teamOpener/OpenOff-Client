import Text from 'components/common/Text/Text';
import MENT_OPEN_EVENT from 'constants/openEvent/openEventMessage';
import { TouchableOpacity } from 'react-native';
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
      <Text style={findButtonStyles.text}>
        {MENT_OPEN_EVENT.MAIN.FIND_ADDRESS}
      </Text>
    </TouchableOpacity>
  );
};

export default FindButton;
