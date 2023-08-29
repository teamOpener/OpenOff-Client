import Divider from 'components/common/Divider/Divider';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import UserFieldBoxGroup from 'components/user/groups/UserFieldBoxGroup/UserFieldBoxGroup';
import UserMenuButtonGroup from 'components/user/groups/UserMenuButtonGroup/UserMenuButtonGroup';
import MENT_USER from 'constants/user/userConstants';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import useNavigator from 'hooks/navigator/useNavigator';
import useInterestFields from 'hooks/interest/useInterestFields';
import { useLogout, useMyInfo } from 'hooks/queries/user';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import { colors } from 'styles/theme';
import UserSupportGroup from 'components/user/groups/UserSupportGroup/UserSupportGroup';
import userScreenStyles from './UserScreen.style';

const UserScreen = () => {
  const { data: userInfo } = useMyInfo();
  const { stackNavigation } = useNavigator();

  const { clickableInterestTags } = useInterestFields();

  const handleEditProfile = () => {
    stackNavigation.navigate('UserProfileEdit');
  };

  const handleResetInterest = () => {
    stackNavigation.navigate('UserInterest');
  };

  const { isLoading: isLogoutLoading } = useLogout();

  return (
    <View style={userScreenStyles.container}>
      {isLogoutLoading && (
        <WithIconLoading
          isActive
          backgroundColor={colors.background}
          text="로그아웃 중입니다."
        />
      )}
      <View style={userScreenStyles.userInfo}>
        <View style={userScreenStyles.userBasicContainer}>
          <Pressable
            style={userScreenStyles.profileMainContainer}
            onPress={handleEditProfile}
          >
            <View style={userScreenStyles.userProfileImageContainer}>
              {userInfo?.userInfo.profileImageUrl ? (
                <Image
                  style={userScreenStyles.userProfileImage}
                  source={{ uri: userInfo?.userInfo.profileImageUrl }}
                />
              ) : (
                <Icon
                  name="IconUser"
                  size={50}
                  fill="grey"
                  style={userScreenStyles.userNoneImage}
                />
              )}
            </View>
            <Icon
              style={userScreenStyles.pencilPosition}
              name="IconPencilCircle"
              size={17}
              fill="grey"
            />
          </Pressable>
          <Spacing height={6} />
          <Text variant="h4" color="white">
            {userInfo?.userInfo.nickname}
          </Text>
          <Text color="grey" style={userScreenStyles.emailText}>
            {userInfo?.socialAccountInfoList[0].email}
          </Text>
        </View>

        <View style={userScreenStyles.fieldContainer}>
          <TouchableOpacity
            onPress={handleResetInterest}
            style={userScreenStyles.fieldResetButton}
          >
            <Icon name="IconPlace" size={16} fill="main" />
            <Text style={userScreenStyles.fieldResetText}>
              {MENT_USER.MAIN.USER_INTEREST_FIELD}
            </Text>
            <Icon name="IconArrowRight" size={16} fill="white" />
          </TouchableOpacity>
          <UserFieldBoxGroup
            fieldLabels={clickableInterestTags()
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
      <Divider height={8} color="darkGrey" />

      <UserSupportGroup />
    </View>
  );
};

export default UserScreen;
