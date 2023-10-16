import i18n from 'locales';
import { useQueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import queryKeys from 'constants/queries/queryKeys';
import useDialog from 'hooks/app/useDialog';
import useNavigator from 'hooks/navigator/useNavigator';
import {
  useCancelPermittedApplicant,
  useDenyApplicationUser,
  usePermitApplicant,
} from 'hooks/queries/ledger';
import { ApplicantApplyDetailResponseDto } from 'models/ledger/response/ApplicantApplyDetailResponseDto';
import { View } from 'react-native';
import { ApiErrorResponse } from 'types/ApiResponse';
import ActionButton from '../buttons/ActionButton/ActionButton';
import userHeaderStyles from './UserHeader.style';

interface Props {
  userInfo: ApplicantApplyDetailResponseDto;
  ledgerId: number;
}

const UserHeader = ({ userInfo, ledgerId }: Props) => {
  const queryClient = useQueryClient();
  const { stackNavigation } = useNavigator();
  const { openDialog } = useDialog();

  const resetQueries = () => {
    queryClient.invalidateQueries(queryKeys.participantKeys.all);
    queryClient.invalidateQueries(queryKeys.hostKeys.ledgerList);
    queryClient.invalidateQueries(
      queryKeys.hostKeys.statusByIndexId(userInfo.eventIndexId),
    );
    queryClient.invalidateQueries(
      queryKeys.hostKeys.applicantQnAbyLedgerId(ledgerId),
    );
    queryClient.invalidateQueries(queryKeys.eventKeys.details);
  };

  const successCallback = (text: string) => {
    resetQueries();
    setTimeout(() => {
      resetQueries();
    }, 1000);

    openDialog({
      type: 'success',
      text,
      closeText: i18n.t('back_to_applicant'),
      callback: () => {
        stackNavigation.goBack();
      },
    });
  };

  const handlePermitError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? i18n.t('default_error_message'),
    });
  };

  const { mutateAsync: permitApplicant } = usePermitApplicant(
    () => successCallback(i18n.t('success_approve')),
    handlePermitError,
  );

  const handleApprove = async () => {
    await permitApplicant({ ladgerId: ledgerId });
  };

  const { mutateAsync: denyApplicationUser } = useDenyApplicationUser(
    () => successCallback(i18n.t('success_decline')),
    handlePermitError,
  );

  const handleDeny = async () => {
    openDialog({
      type: 'confirm',
      text: i18n.t('title_decline'),
      apply: async () => {
        await denyApplicationUser({
          ledgerId,
          rejectReason: '',
        });
      },
      applyText: i18n.t('yes'),
      closeText: i18n.t('no'),
    });
  };

  const { mutateAsync: cancelPermittedApplicant } = useCancelPermittedApplicant(
    () => successCallback(i18n.t('success_cancel_approval')),
    handlePermitError,
  );

  const handleCancel = async () => {
    openDialog({
      type: 'confirm',
      text: i18n.t('title_cancel_approval'),
      apply: async () => {
        await cancelPermittedApplicant({ ladgerId: ledgerId });
      },
      applyText: i18n.t('yes'),
      closeText: i18n.t('no'),
    });
  };

  return (
    <View style={userHeaderStyles.container}>
      <SpaceLayout direction="row" size={5} style={userHeaderStyles.userInfo}>
        <Text>{userInfo.username}</Text>
        <Text>{userInfo.birth}</Text>
        <Icon
          name={userInfo.genderType === 'MAN' ? 'IconMale' : 'IconFemale'}
          size={17}
          fill={userInfo.genderType === 'MAN' ? 'blue' : 'error'}
        />
      </SpaceLayout>

      <SpaceLayout direction="row" size={5}>
        {userInfo.isJoined && (
          <View style={userHeaderStyles.admissionTextWrapper}>
            <Text color="lightGreen" style={userHeaderStyles.admissionText}>
              {i18n.t('admission')}
            </Text>
          </View>
        )}
        {!userInfo.isJoined && userInfo.isAccepted && (
          <ActionButton
            label={i18n.t('label_cancel_approval')}
            style={userHeaderStyles.approveBtn}
            onPress={handleCancel}
          />
        )}
        {!userInfo.isJoined && !userInfo.isAccepted && (
          <>
            <ActionButton label={i18n.t('deny')} onPress={handleDeny} />
            <ActionButton
              label={i18n.t('label_approve')}
              style={userHeaderStyles.approveBtn}
              onPress={handleApprove}
            />
          </>
        )}
      </SpaceLayout>
    </View>
  );
};

export default UserHeader;
