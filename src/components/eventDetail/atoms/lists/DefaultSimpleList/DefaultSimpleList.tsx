import Text from 'components/common/Text/Text';
import { View } from 'react-native';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import defaultSimpleListStyles from './DefaultSimpleList.style';

interface Props {
  title: string;
  description: string;
}

const DefaultSimpleList = ({ title, description }: Props) => {
  return (
    <SpaceLayout direction="row" size={10}>
      <View>
        <Text variant="body2" color="grey">
          {title}
        </Text>
      </View>
      <SpaceLayout size={5} style={defaultSimpleListStyles.desc}>
        <Text style={defaultSimpleListStyles.descText}>{description}</Text>
      </SpaceLayout>
    </SpaceLayout>
  );
};

export default DefaultSimpleList;
