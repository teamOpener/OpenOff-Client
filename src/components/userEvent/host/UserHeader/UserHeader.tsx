import { useQueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import API_ERROR_MESSAGE from 'constants/app/errorMessage';
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
import MENT_HOST from 'constants/userEvent/host/hostMessage';
import MENT_DIALOG from 'constants/common/dialogMessage';
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
      closeText: MENT_HOST.APPLICANT.BACK_TO_APPLICANT,
      callback: () => {
        stackNavigation.goBack();
      },
    });
  };

  const handlePermitError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? API_ERROR_MESSAGE.DEFAULT,
    });
  };

  const { mutateAsync: permitApplicant } = usePermitApplicant(
    () => successCallback(MENT_HOST.APPLICANT.APPROVE.SUCCESS),
    handlePermitError,
  );

  const handleApprove = async () => {
    await permitApplicant({ ladgerId: ledgerId });
  };

  const { mutateAsync: denyApplicationUser } = useDenyApplicationUser(
    () => successCallback(MENT_HOST.APPLICANT.DENY.SUCCESS),
    handlePermitError,
  );

  const handleDeny = async () => {
    openDialog({
      type: 'confirm',
      text: MENT_HOST.APPLICANT.DENY.TITLE,
      apply: async () => {
        await denyApplicationUser({ ledgerId });
      },
      applyText: MENT_DIALOG.DIALOG.YES,
      closeText: MENT_DIALOG.DIALOG.NO,
    });
  };

  const { mutateAsync: cancelPermittedApplicant } = useCancelPermittedApplicant(
    () => successCallback(MENT_HOST.APPLICANT.CANCEL.SUCCESS),
    handlePermitError,
  );

  const handleCancel = async () => {
    openDialog({
      type: 'confirm',
      text: MENT_HOST.APPLICANT.CANCEL.TITLE,
      apply: async () => {
        await cancelPermittedApplicant({ ladgerId: ledgerId });
      },
      applyText: MENT_DIALOG.DIALOG.YES,
      closeText: MENT_DIALOG.DIALOG.NO,
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
              {MENT_HOST.APPLICANT.ADMISSION}
            </Text>
          </View>
        )}
        {!userInfo.isJoined && userInfo.isAccepted && (
          <ActionButton
            label={MENT_HOST.APPLICANT.CANCEL.LABEL}
            style={userHeaderStyles.approveBtn}
            onPress={handleCancel}
          />
        )}
        {!userInfo.isJoined && !userInfo.isAccepted && (
          <>
            <ActionButton
              label={MENT_HOST.APPLICANT.DENY.LABEL}
              onPress={handleDeny}
            />
            <ActionButton
              label={MENT_HOST.APPLICANT.APPROVE.LABEL}
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
