import React from 'react';
import { View } from 'react-native';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import smallSimpleListStyles from './SmallSimpleList.style';

interface Props {
  title: string;
  description: string;
  action?: React.ReactNode;
}

const SmallSimpleList = ({ title, description, action }: Props) => {
  return (
    <SpaceLayout direction="row" size={10}>
      <View>
        <Text style={smallSimpleListStyles.title}>{title}</Text>
      </View>
      <SpaceLayout size={5} style={smallSimpleListStyles.desc}>
        <Text variant="body3">{description}</Text>
        {action && action}
      </SpaceLayout>
    </SpaceLayout>
  );
};

export default SmallSimpleList;
