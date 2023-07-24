import Text from 'components/common/Text/Text';
import { View } from 'react-native';
import labelStyles from './Label.style';

interface Props {
  content: string;
}

const Label = ({ content }: Props) => {
  return (
    <View style={labelStyles.container}>
      <Text style={labelStyles.text}>{content}</Text>
    </View>
  );
};

export default Label;
