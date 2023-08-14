import { View, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import Text from 'components/common/Text/Text';
import Icon from 'components/common/Icon/Icon';
import UserFieldBoxGroup from 'components/user/groups/UserFieldBoxGroup/UserFieldBoxGroup';
import fieldData from 'data/lists/fieldData';
import UserMenuButtonGroup from 'components/user/groups/UserMenuButtonGroup/UserMenuButtonGroup';
import Divider from 'components/common/Divider/Divider';
import Spacing from 'components/common/Spacing/Spacing';
import { useMyInfo } from 'hooks/queries/user';
import useNavigator from 'hooks/navigator/useNavigator';
import userScreenStyles from './UserScreen.style';

const UserScreen = () => {
  const { data: userInfo } = useMyInfo();
  const { stackNavigation } = useNavigator();
  const USER_INTEREST_FIELD = '관심 분야';
  const CUSTOMER_SERVICE_CENTER = '고객센터';
  const FAQ = 'FAQ';
  const ANNOUNCEMENT = '공지사항';
  const INQUIRY = '문의하기';
  const SETTING = '설정';
  const SERVICE_SETTING = '서비스 설정';
  const LOGOUT = '로그아웃';

  const handleEditProfile = () => {
    stackNavigation.navigate('UserProfileEdit');
  };

  return (
    <View style={userScreenStyles.container}>
      <View style={userScreenStyles.userInfo}>
        <View style={userScreenStyles.userBasicContainer}>
          <Pressable
            style={userScreenStyles.userProfileImage}
            onPress={handleEditProfile}
          >
            <Icon name="IconUser" size={50} fill="grey" />
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
          <TouchableOpacity style={userScreenStyles.fieldResetButton}>
            <Icon name="IconPlace" size={16} fill="main" />
            <Text style={userScreenStyles.fieldResetText}>
              {USER_INTEREST_FIELD}
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
          {CUSTOMER_SERVICE_CENTER}
        </Text>
        <Pressable>
          <Text variant="body2">{FAQ}</Text>
        </Pressable>
        <Pressable>
          <Text variant="body2">{ANNOUNCEMENT}</Text>
        </Pressable>
        <Pressable>
          <Text variant="body2">{INQUIRY}</Text>
        </Pressable>
        <Divider height={1} color="darkGrey" />
        <Text variant="bodySB" color="darkGrey">
          {SETTING}
        </Text>
        <Pressable>
          <Text variant="body2">{SERVICE_SETTING}</Text>
        </Pressable>
        <Pressable>
          <Text variant="body2">{LOGOUT}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default UserScreen;
