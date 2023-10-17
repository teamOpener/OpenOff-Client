import i18n from 'locales';
import Text from 'components/common/Text/Text';
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
      <Text style={findButtonStyles.text}>{i18n.t('find_address')}</Text>
    </TouchableOpacity>
  );
};

export default FindButton;
