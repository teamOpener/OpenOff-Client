import { useQueryClient } from '@tanstack/react-query';
import Divider from 'components/common/Divider/Divider';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import UserFieldBoxGroup from 'components/user/groups/UserFieldBoxGroup/UserFieldBoxGroup';
import UserMenuButtonGroup from 'components/user/groups/UserMenuButtonGroup/UserMenuButtonGroup';
import MENT_USER from 'constants/user/userConstants';
import fieldData from 'data/lists/fieldData';
import {
  Linking,
  Platform,
  NativeModules,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import useNavigator from 'hooks/navigator/useNavigator';
import { useMyInfo } from 'hooks/queries/user';

import { useAuthorizeStore } from 'stores/Authorize';
import userScreenStyles from './UserScreen.style';

const UserScreen = () => {
  const { resetToken, setIsLogin } = useAuthorizeStore();
  const { data: userInfo } = useMyInfo();
  const queryClient = useQueryClient();
  const { stackNavigation } = useNavigator();

  const handleEditProfile = () => {
    stackNavigation.navigate('UserProfileEdit');
  };

  const handleResetInterest = () => {
    stackNavigation.navigate('UserInterest');
  };

  const handleShowSettingScreen = () => {
    // ios 일 경우
    if (Platform.OS === 'ios') Linking.openURL('App-Prefs:root');
    // 안드로이드일 경우
    else NativeModules.ExternalURLModule.linkAndroidSettings();
  };

  const handleLogout = () => {
    resetToken();
    queryClient.clear();
    setIsLogin(false);
  };

  return (
    <View style={userScreenStyles.container}>
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
            fieldLabels={fieldData
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={userScreenStyles.userControllerContainer}
      >
        <Text variant="bodySB" color="darkGrey">
          {MENT_USER.MAIN.CUSTOMER_SERVICE_CENTER}
        </Text>
        <Pressable>
          <Text variant="body2">{MENT_USER.MAIN.FAQ}</Text>
        </Pressable>
        {/* <Pressable>
          <Text variant="body2">{MENT_USER.MAIN.ANNOUNCEMENT}</Text>
        </Pressable> */}
        <Pressable>
          <Text variant="body2">{MENT_USER.MAIN.INQUIRY}</Text>
        </Pressable>
        <Divider height={1} color="darkGrey" />
        <Pressable>
          <Text variant="bodySB" color="darkGrey">
            {MENT_USER.MAIN.SETTING}
          </Text>
        </Pressable>
        <Pressable onPress={handleShowSettingScreen}>
          <Text variant="body2">{MENT_USER.MAIN.SERVICE_SETTING}</Text>
        </Pressable>
        <Pressable onPress={handleLogout}>
          <Text variant="body2">{MENT_USER.MAIN.LOGOUT}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default UserScreen;
