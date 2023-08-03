import { TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import Icon from '../../../common/Icon/Icon';
import Text from '../../../common/Text/Text';
import selectBoxButtonStyles from './SelectBoxButton.style';

interface Props {
  label: string;
  handlePress: () => void;
  isActive: boolean;
}

const SelectBoxButton = ({ label, handlePress, isActive }: Props) => {
  return (
    <TouchableOpacity
      style={{
        ...selectBoxButtonStyles.container,
        borderColor: isActive ? colors.main : colors.white,
      }}
      onPress={handlePress}
    >
      <Text
        variant="body2"
        color={isActive ? 'main' : 'white'}
        style={selectBoxButtonStyles.textStyle}
      >
        {label}
      </Text>
      <View style={selectBoxButtonStyles.arrowContainer}>
        {isActive ? (
          <Icon name="IconArrowUp" fill="main" size={12} />
        ) : (
          <Icon name="IconArrowDown" fill="white" size={12} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SelectBoxButton;
