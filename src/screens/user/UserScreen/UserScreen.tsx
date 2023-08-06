import { View, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import Text from 'components/common/Text/Text';
import Icon from 'components/common/Icon/Icon';
import UserFieldBoxGroup from 'components/user/groups/UserFieldBoxGroup/UserFieldBoxGroup';
import userInfo from 'mocks/user/userInfo';
import fieldData from 'data/lists/fieldData';
import UserMenuButtonGroup from 'components/user/groups/UserMenuButtonGroup/UserMenuButtonGroup';
import Divider from 'components/common/Divider/Divider';
import Spacing from 'components/common/Spacing/Spacing';
import userScreenStyles from './UserScreen.style';

const UserScreen = () => {
  return (
    <View style={userScreenStyles.container}>
      <View style={userScreenStyles.userInfo}>
        <View style={userScreenStyles.userBasicContainer}>
          <Pressable style={userScreenStyles.userProfileImage}>
            <Icon name="IconUser" size={50} fill="grey" />
          </Pressable>
          <Spacing height={6} />
          <Text variant="h4" color="white">
            {userInfo.nickname}
          </Text>
          <Text color="grey" style={userScreenStyles.emailText}>
            {userInfo.email}
          </Text>
        </View>

        <View style={userScreenStyles.fieldContainer}>
          <TouchableOpacity style={userScreenStyles.fieldResetButton}>
            <Icon name="IconPlace" size={16} fill="main" />
            <Text style={userScreenStyles.fieldResetText}>관심 분야</Text>
            <Icon name="IconArrowRight" size={16} fill="white" />
          </TouchableOpacity>
          <UserFieldBoxGroup
            fieldLabels={fieldData
              .filter((field) =>
                userInfo.interestField.find(
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
          고객센터
        </Text>
        <Pressable>
          <Text>FAQ</Text>
        </Pressable>
        <Pressable>
          <Text>공지사항</Text>
        </Pressable>
        <Pressable>
          <Text>문의하기</Text>
        </Pressable>
        <Divider height={1} color="darkGrey" />
        <Text variant="bodySB" color="darkGrey">
          설정
        </Text>
        <Pressable>
          <Text>서비스 설정</Text>
        </Pressable>
        <Pressable>
          <Text>로그아웃</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default UserScreen;
