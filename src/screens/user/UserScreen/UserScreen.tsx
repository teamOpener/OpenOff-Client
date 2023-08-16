import Divider from 'components/common/Divider/Divider';
import Icon from 'components/common/Icon/Icon';
import Spacing from 'components/common/Spacing/Spacing';
import Text from 'components/common/Text/Text';
import UserFieldBoxGroup from 'components/user/groups/UserFieldBoxGroup/UserFieldBoxGroup';
import UserMenuButtonGroup from 'components/user/groups/UserMenuButtonGroup/UserMenuButtonGroup';
import MENT_USER from 'constants/user/userConstants';
import fieldData from 'data/lists/fieldData';
import useNavigator from 'hooks/navigator/useNavigator';
import { useMyInfo } from 'hooks/queries/user';
import {
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import userScreenStyles from './UserScreen.style';

const UserScreen = () => {
  const { data: userInfo } = useMyInfo();
  const { stackNavigation } = useNavigator();

  const handleEditProfile = () => {
    stackNavigation.navigate('UserProfileEdit');
  };

  const handleResetInterest = () => {
    stackNavigation.navigate('UserInterest');
  };

  return (
    <View style={userScreenStyles.container}>
      <View style={userScreenStyles.userInfo}>
        <View style={userScreenStyles.userBasicContainer}>
          <Pressable
            style={userScreenStyles.userProfileImageContainer}
            onPress={handleEditProfile}
          >
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
        <Pressable>
          <Text variant="body2">{MENT_USER.MAIN.ANNOUNCEMENT}</Text>
        </Pressable>
        <Pressable>
          <Text variant="body2">{MENT_USER.MAIN.INQUIRY}</Text>
        </Pressable>
        <Divider height={1} color="darkGrey" />
        <Text variant="bodySB" color="darkGrey">
          {MENT_USER.MAIN.SETTING}
        </Text>
        <Pressable>
          <Text variant="body2">{MENT_USER.MAIN.SERVICE_SETTING}</Text>
        </Pressable>
        <Pressable>
          <Text variant="body2">{MENT_USER.MAIN.LOGOUT}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default UserScreen;
