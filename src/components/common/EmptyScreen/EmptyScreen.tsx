import Text from 'components/common/Text/Text';
import React from 'react';
import { Image, View } from 'react-native';
import emptyScreenStyles from './EmptyScreen.style';

interface Props extends React.ComponentProps<typeof View> {
  content: string;
}

const EmptyScreen = ({ content, ...rest }: Props) => {
  return (
    <View style={emptyScreenStyles.container} {...rest}>
      <Image
        style={emptyScreenStyles.emptyImage}
        source={require('../../../assets/images/empty.png')}
      />
      <Text variant="body2" color="main">
        {content}
      </Text>
    </View>
  );
};

export default EmptyScreen;
