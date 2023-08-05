import * as Icons from 'assets/icons';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import smallIconButtonStyles from './SmallIconButton.style';

interface Props extends TouchableOpacityProps {
  iconName: keyof typeof Icons;
  label: string;
}

const SmallIconButton = ({ iconName, label, style, ...rest }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[smallIconButtonStyles.container, style]}
      {...rest}
    >
      <Icon name={iconName} fill="main" size={23} />
      <Text color="main">{label}</Text>
    </TouchableOpacity>
  );
};

export default SmallIconButton;
