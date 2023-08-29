import Text from 'components/common/Text/Text';
import { View } from 'react-native';
import xSmallTagStyles from './XSmallTag.style';

interface Props {
  label: string;
}

const XSmallTag = ({ label }: Props) => {
  return (
    <View style={xSmallTagStyles.container}>
      <Text color="main" style={xSmallTagStyles.text}>
        {label}
      </Text>
    </View>
  );
};

export default XSmallTag;
