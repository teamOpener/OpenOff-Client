import { View } from 'react-native';
import Text from 'components/common/Text/Text';
import emptyLayoutStyles from './EmptyLayout.style';

interface Props {
  helpText: string;
}

const EmptyLayout = ({ helpText }: Props) => {
  return (
    <View style={emptyLayoutStyles.container}>
      <Text variant="body2">{helpText}</Text>
    </View>
  );
};

export default EmptyLayout;
