import { TouchableOpacity } from 'react-native';
import Text from 'components/common/Text/Text';
import nickNameListStyles from './NickNameList.style';

interface Props {
  label: string;
  onPress: () => void;
}

const NickNameList = ({ label, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={nickNameListStyles.searchItem}
      onPress={onPress}
    >
      <Text style={nickNameListStyles.searchText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default NickNameList;
