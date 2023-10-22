import React from 'react';
import Text from 'components/common/Text/Text';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import UserMenuButtonGroup from 'components/user/groups/UserMenuButtonGroup/UserMenuButtonGroup';
import UserFieldBoxGroup from 'components/user/groups/UserFieldBoxGroup/UserFieldBoxGroup';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import { useMyInfo } from 'hooks/queries/user';
import useNavigator from 'hooks/navigator/useNavigator';
import i18n from 'locales';
import useInterestFields from 'hooks/interest/useInterestFields';
import userInfoContainerStyles from './UserInfoContainer.style';

const UserInfoContainer = () => {
  const { data: userInfo } = useMyInfo();

  const { stackNavigation } = useNavigator();

  const { generateInterestFieldTags } = useInterestFields();

  const handleEditProfile = () => {
    stackNavigation.navigate('UserProfileEdit');
  };

  const handleResetInterest = () => {
    stackNavigation.navigate('UserInterest');
  };

  return (
    <View style={userInfoContainerStyles.userInfo}>
      <View style={userInfoContainerStyles.userBasicContainer}>
        <Pressable
          style={userInfoContainerStyles.profileMainContainer}
          onPress={handleEditProfile}
        >
          <View style={userInfoContainerStyles.userProfileImageContainer}>
            {userInfo?.userInfo.profileImageUrl ? (
              <Image
                style={userInfoContainerStyles.userProfileImage}
                source={{ uri: userInfo?.userInfo.profileImageUrl }}
              />
            ) : (
              <Icon
                name="IconUser"
                size={50}
                fill="grey"
                style={userInfoContainerStyles.userNoneImage}
              />
            )}
          </View>
          <Icon
            style={userInfoContainerStyles.pencilPosition}
            name="IconPencilCircle"
            size={17}
            fill="grey"
          />
        </Pressable>
        <Spacing height={6} />
        <Text variant="h4" color="white">
          {userInfo?.userInfo.nickname}
        </Text>
        <Text color="grey" style={userInfoContainerStyles.emailText}>
          {userInfo?.socialAccountInfoList[0].email}
        </Text>
      </View>

      <View style={userInfoContainerStyles.fieldContainer}>
        <TouchableOpacity
          onPress={handleResetInterest}
          style={userInfoContainerStyles.fieldResetButton}
        >
          <Icon name="IconPlace" size={16} fill="main" />
          <Text style={userInfoContainerStyles.fieldResetText}>
            {i18n.t('user_interest_field')}
          </Text>
          <Icon name="IconArrowRight" size={16} fill="white" />
        </TouchableOpacity>
        <UserFieldBoxGroup
          fieldLabels={generateInterestFieldTags()
            .filter((field) =>
              userInfo?.userInfo.fieldTypeList.find(
                (userField) => userField === field.value,
              ),
            )
            .map((field) => field.label)}
        />
      </View>
      <UserMenuButtonGroup />
    </View>
  );
};

export default UserInfoContainer;
