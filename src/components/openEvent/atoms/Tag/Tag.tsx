import { getLocale } from 'services/locale';
import Text from 'components/common/Text/Text';
import { TouchableOpacity } from 'react-native';
import tagStyles from './Tag.style';

interface Props {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const Tag = ({ label, isSelected, onPress }: Props) => {
  const locale = getLocale();
  const isKo = locale.startsWith('ko');

  return (
    <TouchableOpacity
      style={[
        tagStyles.container,
        isSelected && tagStyles.selectedContainer,
        !isKo && tagStyles.narrowContainer,
      ]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Text variant="body2" color={isSelected ? 'white' : 'main'}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Tag;
