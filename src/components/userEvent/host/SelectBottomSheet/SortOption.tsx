import { TouchableOpacity } from 'react-native';
import Text from 'components/common/Text/Text';
import Icon from 'components/common/Icon/Icon';
import sortOptionStyles from './SortOption.style';

interface Props {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const SortOption = ({ label, isSelected, onPress }: Props) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={sortOptionStyles.modalTextContainer}
    onPress={onPress}
  >
    <Text color="grey" style={sortOptionStyles.modalText}>
      {label}
    </Text>
    {isSelected && <Icon name="IconCheck" size={15} fill="point" />}
  </TouchableOpacity>
);

export default SortOption;
