import React from 'react';
import { Pressable, View } from 'react-native';
import Text from 'components/common/Text/Text';
import Divider from 'components/common/Divider/Divider';
import Icon from 'components/common/Icon/Icon';
import userInfoTextStyles from './UserInfoText.style';

interface Props {
  title: string;
  content: string;
}

const UserInfoText = ({ title, content }: Props) => {
  return (
    <View style={userInfoTextStyles.container}>
      <Text style={userInfoTextStyles.title}>{title}</Text>
      <View style={userInfoTextStyles.contentContainer}>
        <Text variant="body2">{content}</Text>
        <Pressable>
          <Icon name="IconArrowRight" size={13} />
        </Pressable>
      </View>
      <Divider height={1} color="darkGrey" />
    </View>
  );
};

export default UserInfoText;
