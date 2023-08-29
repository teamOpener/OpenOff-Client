import React from 'react';
import { Pressable, View } from 'react-native';
import Text from 'components/common/Text/Text';
import Divider from 'components/common/Divider/Divider';
import Icon from 'components/common/Icon/Icon';
import useNavigator from 'hooks/navigator/useNavigator';
import userInfoTextStyles from './UserInfoText.style';

interface Props {
  title: string;
  content?: string;
  type?: 'default' | 'password';
}

const UserInfoText = ({ title, content, type = 'default' }: Props) => {
  const { stackNavigation } = useNavigator();

  const handlePasswordReset = () => {
    stackNavigation.navigate('UserPasswordReset');
  };

  return (
    <View style={userInfoTextStyles.container}>
      <Text style={userInfoTextStyles.title}>{title}</Text>
      <View style={userInfoTextStyles.contentContainer}>
        <Text variant="body2">{content}</Text>
        {type === 'password' && (
          <Pressable onPress={handlePasswordReset}>
            <Icon name="IconArrowRight" size={13} />
          </Pressable>
        )}
      </View>
      <Divider height={1} color="darkGrey" />
    </View>
  );
};

export default UserInfoText;
