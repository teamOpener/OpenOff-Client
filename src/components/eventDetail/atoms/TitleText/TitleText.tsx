import Text from 'components/common/Text/Text';
import { View } from 'react-native';
import { colors } from 'styles/theme';
import titleTextStyles from './TitleText.style';

interface Props {
  title: string;
  color?: keyof typeof colors;
}

const TitleText = ({ title, color = 'white' }: Props) => {
  return (
    <View style={titleTextStyles.container}>
      <Text color={color} style={titleTextStyles.title}>
        {title}
      </Text>
    </View>
  );
};

export default TitleText;
