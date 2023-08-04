import React from 'react';
import { View } from 'react-native';
import Text from 'components/common/Text/Text';
import userFieldBoxStyles from './UserFieldBox.style';

interface Props {
  field: string;
}

const UserFieldBox = ({ field }: Props) => {
  return (
    <View style={userFieldBoxStyles.container}>
      <Text color="white">#{field}</Text>
    </View>
  );
};

export default UserFieldBox;
