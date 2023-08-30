import Icon from 'components/common/Icon/Icon';
import { Pressable, View } from 'react-native';
import Text from '../../../common/Text/Text';
import currentFieldFindButtonStyles from './CurrentFieldFindButton.style';

interface Props {
  handlePress: () => void;
  isFindActive: boolean;
}

const CurrentFieldFindButton = ({ isFindActive, handlePress }: Props) => {
  return (
    isFindActive && (
      <View style={currentFieldFindButtonStyles.wrapper}>
        <Pressable
          style={currentFieldFindButtonStyles.container}
          onPress={handlePress}
        >
          <Icon name="IconSend" fill="black" size={20} />
          <Text color="black" style={currentFieldFindButtonStyles.label}>
            현 지도에서 검색
          </Text>
        </Pressable>
      </View>
    )
  );
};

export default CurrentFieldFindButton;
