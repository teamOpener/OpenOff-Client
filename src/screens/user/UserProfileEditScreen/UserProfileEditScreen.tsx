import i18n from 'locales';
import Text from 'components/common/Text/Text';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import UserProfileImageButton from 'components/user/buttons/UserProfileImageButton/UserProfileImageButton';
import UserInfoText from 'components/user/texts/UserInfoText/UserInfoText';
import useDialog from 'hooks/app/useDialog';
import { useMyInfo, useWithdrawal } from 'hooks/queries/user';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from 'styles/theme';
import userProfileEditScreenStyles from './UserProfileEditScreen.style';

const UserProfileEditScreen = () => {
  const { data: userInfo } = useMyInfo();
  const { openDialog } = useDialog();
  const { mutateAsync: withdrawal, isLoading: isWithdrawalLoading } =
    useWithdrawal();

  const handleWithdrawal = async () => {
    openDialog({
      type: 'warning',
      text: i18n.t('withdrawal_check_ment'),
      applyText: i18n.t('yes'),
      closeText: i18n.t('no'),
      apply: async () => {
        await withdrawal();
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
          text={i18n.t('progress_withdrawal')}
        />
      )}
      <View style={userProfileEditScreenStyles.container}>
        <UserProfileImageButton />
        <View style={userProfileEditScreenStyles.emailContainer}>
          <Text style={userProfileEditScreenStyles.title}>
            {i18n.t('email')}
          </Text>
          <Text variant="body2" color="grey">
            {userInfo?.socialAccountInfoList[0].email}
          </Text>
        </View>
        <UserInfoText
          title={i18n.t('name')}
          content={userInfo?.userInfo.userName}
        />
        <UserInfoText
          title={i18n.t('nickname')}
          content={userInfo?.userInfo.nickname}
        />
        {userInfo?.socialAccountInfoList.find(
          (socialAccount) => socialAccount.accountType === 'NORMAL',
        ) && (
          <>
            <UserInfoText
              type="password"
              title={i18n.t('password')}
              content="••••••••"
            />
            <UserInfoText
              title={i18n.t('phone_number')}
              content={formatPhoneNumber(userInfo?.userInfo.phoneNumber)}
            />
          </>
        )}
        <UserInfoText
          title={i18n.t('user_birth')}
          content={i18n.t('user_birth_value', {
            year: userInfo?.userInfo.birth.year,
            month: userInfo?.userInfo.birth.month,
            day: userInfo?.userInfo.birth.day,
          })}
        />
        <View style={userProfileEditScreenStyles.withdrawalContainer}>
          <Text style={userProfileEditScreenStyles.withdrawalInfo}>
            {i18n.t('withdrawal_ment')}
          </Text>
          <Pressable onPress={handleWithdrawal}>
            <Text style={userProfileEditScreenStyles.withdrawal}>
              {i18n.t('withdrawal')}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfileEditScreen;
