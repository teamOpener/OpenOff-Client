import UserFieldBox from 'components/user/boxes/UserFieldBox/UserFieldBox';
import React from 'react';
import { View } from 'react-native';
import userFieldBoxGroupStyles from './UserFieldBoxGroup.style';

interface Props {
  fieldLabels: string[];
}

const UserFieldBoxGroup = ({ fieldLabels }: Props) => {
  return (
    <View style={userFieldBoxGroupStyles.container}>
      {fieldLabels.map((field) => (
        <UserFieldBox key={field} field={field} />
      ))}
    </View>
  );
};

export default UserFieldBoxGroup;
