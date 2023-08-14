import Icon from 'components/common/Icon/Icon';
import React from 'react';
import Text from 'components/common/Text/Text';
import { Pressable, ScrollView, View } from 'react-native';
import UserInfoText from 'components/user/texts/UserInfoText/UserInfoText';
import { useMyInfo } from 'hooks/queries/user';
import userProfileEditScreenStyles from './UserProfileEditScreen.style';

const UserProfileEditScreen = () => {
  const { data: userInfo } = useMyInfo();

  const handleWithdrawal = () => {
    return false;
  };

  const USER_BIRTH = `${userInfo?.userInfo.birth.year}년 ${userInfo?.userInfo.birth.month}월 ${userInfo?.userInfo.birth.day}일`;

  const formatPhoneNumber = (phoneNumber = '01000000000') => {
    const numericOnly = phoneNumber.replace(/\D/g, '');
    // 포맷팅된 번호 생성
    const formattedNumber = numericOnly.replace(
      /(\d{3})(\d{4})(\d{4})/,
      '010-$2-$3',
    );
    return formattedNumber;
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
            {userInfo?.socialAccountInfoList[0].email}
          </Text>
        </View>
        <UserInfoText title="이름" content={userInfo?.userInfo.userName} />
        <UserInfoText title="닉네임" content={userInfo?.userInfo.nickname} />
        {userInfo?.socialAccountInfoList[0].accountType === 'NORMAL' && (
          <UserInfoText title="비밀번호" content="********" />
        )}
        <UserInfoText
          title="휴대폰 번호"
          content={formatPhoneNumber(userInfo?.userInfo.phoneNumber)}
        />
        <UserInfoText title="생년월일" content={USER_BIRTH} />
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
