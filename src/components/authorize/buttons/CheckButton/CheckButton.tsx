import { Image, View, TouchableOpacity, Pressable } from 'react-native';
import Text from 'components/common/Text/Text';
import Icon from 'components/common/Icon/Icon';
import checkButtonStyles from './CheckButton.style';

interface Props {
  value: boolean;
  handlePress: () => void;
  label: string;
  marginBottom?: number;
  handleDetailPress?: () => void;
}

const CheckButton = ({
  value,
  handlePress,
  label,
  marginBottom = 0,
  handleDetailPress,
}: Props) => {
  return (
    <View style={{ ...checkButtonStyles.container, marginBottom }}>
      <Pressable
        style={checkButtonStyles.checkContent}
        onPress={() => {
          handlePress();
        }}
      >
        <View style={checkButtonStyles.checkContainer}>
          <Image
            style={checkButtonStyles.check}
            source={
              value
                ? require('../../../../assets/images/check.png')
                : require('../../../../assets/images/nonCheck.png')
            }
          />
        </View>
        <Text style={checkButtonStyles.checkButtonLabel}>{label}</Text>
      </Pressable>
      {handleDetailPress && (
        <TouchableOpacity onPress={handleDetailPress}>
          <Icon name="IconArrowRight" size={11} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CheckButton;
