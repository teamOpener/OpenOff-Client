import i18n from 'locales';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Text from 'components/common/Text/Text';
import Icon from 'components/common/Icon/Icon';
import declarationButtonStyles from './DeclarationButton.style';

const DeclarationButton = ({ onPress, ...rest }: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={declarationButtonStyles.container}
      onPress={onPress}
      {...rest}
    >
      <Icon name="IconSiren" size={14} fill="white" />
      <Text style={declarationButtonStyles.label}>{i18n.t('report')}</Text>
    </TouchableOpacity>
  );
};

export default DeclarationButton;
