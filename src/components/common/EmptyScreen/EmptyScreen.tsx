import Text from 'components/common/Text/Text';
import { Image, View } from 'react-native';
import emptyScreenStyles from './EmptyScreen.style';

interface Props {
  content: string;
}

const EmptyScreen = ({ content }: Props) => {
  return (
    <View style={emptyScreenStyles.container}>
      <Image
        style={emptyScreenStyles.emptyImage}
        source={require('../../../assets/images/empty.png')}
      />
      <Text variant="h4" color="main">
        {content}
      </Text>
    </View>
  );
};

export default EmptyScreen;
