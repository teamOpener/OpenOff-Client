import * as Icons from 'assets/icons';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import largeIconButtonStyles from './LargeIconButton.style';

interface Props extends TouchableOpacityProps {
  iconName: keyof typeof Icons;
  label: string;
}

const LargeIconButton = ({
  iconName,
  label,
  disabled,
  style,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        largeIconButtonStyles.container,
        disabled && largeIconButtonStyles.disabledContainer,
        style,
      ]}
      {...rest}
    >
      <View style={largeIconButtonStyles.iconWrapper}>
        <Icon name={iconName} size={57} color="white" />
      </View>
      <Text style={largeIconButtonStyles.labelText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default LargeIconButton;
