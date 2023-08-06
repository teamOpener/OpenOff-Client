import Icon from 'components/common/Icon/Icon';
import React from 'react';
import Text from 'components/common/Text/Text';
import { Pressable, ScrollView, View } from 'react-native';
import userInfo from 'mocks/user/userInfo';
import UserInfoText from 'components/user/texts/UserInfoText/UserInfoText';
import userProfileEditScreenStyles from './UserProfileEditScreen.style';

const UserProfileEditScreen = () => {
  const handleWithdrawal = () => {
    return false;
  };

  return (
    <ScrollView>
      <View style={userProfileEditScreenStyles.container}>
        <View style={userProfileEditScreenStyles.profileContainer}>
          <Pressable style={userProfileEditScreenStyles.userProfileImage}>
            <Icon name="IconUser" size={80} fill="grey" />
          </Pressable>
        </View>
        <View style={userProfileEditScreenStyles.emailContainer}>
          <Text style={userProfileEditScreenStyles.title}>이메일</Text>
          <Text variant="body2" color="grey">
            {userInfo.email}
          </Text>
        </View>
        <UserInfoText title="이름" content={userInfo.name} />
        <UserInfoText title="닉네임" content={userInfo.nickname} />
        <UserInfoText title="비밀번호" content={userInfo.password} />
        <UserInfoText title="휴대폰 번호" content={userInfo.phoneNumber} />
        <UserInfoText title="생년월일" content={userInfo.birth} />
        <View style={userProfileEditScreenStyles.withdrawalContainer}>
          <Text style={userProfileEditScreenStyles.withdrawalInfo}>
            회원정보를 삭제하시겠어요?
          </Text>
          <Pressable onPress={handleWithdrawal}>
            <Text style={userProfileEditScreenStyles.withdrawal}>회원탈퇴</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfileEditScreen;
