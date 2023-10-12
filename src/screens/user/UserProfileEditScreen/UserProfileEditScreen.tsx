import Text from 'components/common/Text/Text';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import UserProfileImageButton from 'components/user/buttons/UserProfileImageButton/UserProfileImageButton';
import UserInfoText from 'components/user/texts/UserInfoText/UserInfoText';
import MENT_DIALOG from 'constants/common/dialogMessage';
import MENT_USER from 'constants/user/userMessage';
import useDialog from 'hooks/app/useDialog';
import { useLogout, useMyInfo } from 'hooks/queries/user';
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
      text: MENT_USER.PROFILE_EDIT.WITHDRAWAL_CHECK_MENT,
      applyText: MENT_DIALOG.DIALOG.YES,
      closeText: MENT_DIALOG.DIALOG.NO,
      apply: async () => {
        await logout();
      },
    });
  };

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
          text={MENT_USER.PROFILE_EDIT.PROGRESS_WITHDRAWAL}
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
          <>
            <UserInfoText
              type="password"
              title={MENT_USER.PROFILE_EDIT.PASSWORD}
              content="••••••••"
            />
            <UserInfoText
              title={MENT_USER.PROFILE_EDIT.PHONENUMBER}
              content={formatPhoneNumber(userInfo?.userInfo.phoneNumber)}
            />
          </>
        )}
        <UserInfoText
          title={MENT_USER.PROFILE_EDIT.USER_BIRTH}
          content={MENT_USER.PROFILE_EDIT.USER_BIRTH_VALUE(
            userInfo?.userInfo.birth.year,
            userInfo?.userInfo.birth.month,
            userInfo?.userInfo.birth.day,
          )}
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
