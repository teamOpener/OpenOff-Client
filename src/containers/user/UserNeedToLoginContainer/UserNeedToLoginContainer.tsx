import Icon from 'components/common/Icon/Icon';
import React from 'react';
import Text from 'components/common/Text/Text';
import { View } from 'react-native';
import Spacing from 'components/common/Spacing/Spacing';
import i18n from 'locales';
import userNeedToLoginContainerStyles from './UserNeedToLoginContainer.style';

const UserNeedToLoginContainer = () => {
  return (
    <View style={userNeedToLoginContainerStyles.userInfo}>
      <View style={userNeedToLoginContainerStyles.userBasicContainer}>
        <View style={userNeedToLoginContainerStyles.profileMainContainer}>
          <View
            style={userNeedToLoginContainerStyles.userProfileImageContainer}
          >
            <Icon
              name="IconUser"
              size={50}
              fill="grey"
              style={userNeedToLoginContainerStyles.userNoneImage}
            />
          </View>
        </View>
        <Spacing height={20} />
        <Text variant="h4" color="white">
          {i18n.t('user_need_to_login')}
        </Text>
      </View>
    </View>
  );
};

export default UserNeedToLoginContainer;
