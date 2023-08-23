import Text from 'components/common/Text/Text';
import UserProfileImageButton from 'components/user/buttons/UserProfileImageButton/UserProfileImageButton';
import UserInfoText from 'components/user/texts/UserInfoText/UserInfoText';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import MENT_USER from 'constants/user/userConstants';
import { useLogout, useMyInfo } from 'hooks/queries/user';
import useDialog from 'hooks/app/useDialog';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from 'styles/theme';
import userProfileEditScreenStyles from './UserProfileEditScreen.style';

const UserProfileEditScreen = () => {
  const { data: userInfo } = useMyInfo();
  const { openDialog } = useDialog();
  const { mutateAsync: logout, isLoading: isWithdrawalLoading } = useLogout();

  const handleWithdrawal = async () => {
    openDialog({
      type: 'warning',
      text: '정말로 탈퇴하시겠습니까?',
      applyText: '예',
      closeText: '아니오',
      apply: async () => {
        await logout();
      },
    });
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
      {isWithdrawalLoading && (
        <WithIconLoading
          isActive
          backgroundColor={colors.background}
          text="회원탈퇴 중입니다."
        />
      )}
      <View style={userProfileEditScreenStyles.container}>
        <UserProfileImageButton />
        <View style={userProfileEditScreenStyles.emailContainer}>
          <Text style={userProfileEditScreenStyles.title}>
            {MENT_USER.PROFILE_EDIT.EMAIL}
          </Text>
          <Text variant="body2" color="grey">
            {userInfo?.socialAccountInfoList[0].email}
          </Text>
        </View>
        <UserInfoText
          title={MENT_USER.PROFILE_EDIT.USER_NAME}
          content={userInfo?.userInfo.userName}
        />
        <UserInfoText
          title={MENT_USER.PROFILE_EDIT.NICK_NAME}
          content={userInfo?.userInfo.nickname}
        />
        {userInfo?.socialAccountInfoList.find(
          (socialAccount) => socialAccount.accountType === 'NORMAL',
        ) && (
          <UserInfoText
            type="password"
            title={MENT_USER.PROFILE_EDIT.PASSWORD}
            content="••••••••"
          />
        )}
        <UserInfoText
          title={MENT_USER.PROFILE_EDIT.PHONENUMBER}
          content={formatPhoneNumber(userInfo?.userInfo.phoneNumber)}
        />
        <UserInfoText
          title={MENT_USER.PROFILE_EDIT.USER_BIRTH}
          content={USER_BIRTH}
        />
        <View style={userProfileEditScreenStyles.withdrawalContainer}>
          <Text style={userProfileEditScreenStyles.withdrawalInfo}>
            {MENT_USER.PROFILE_EDIT.WITHDRAWAL_MENT}
          </Text>
          <Pressable onPress={handleWithdrawal}>
            <Text style={userProfileEditScreenStyles.withdrawal}>
              {MENT_USER.PROFILE_EDIT.WITHDRAWAL}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfileEditScreen;
