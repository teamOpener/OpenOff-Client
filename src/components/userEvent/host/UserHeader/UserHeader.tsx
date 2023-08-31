import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { View } from 'react-native';
import { ApplicantApplyDetailResponseDto } from 'models/ledger/response/ApplicantApplyDetailResponseDto';
import API_ERROR_MESSAGE from 'constants/errorMessage';
import { useQueryClient } from '@tanstack/react-query';
import useNavigator from 'hooks/navigator/useNavigator';
import useDialog from 'hooks/app/useDialog';
import queryKeys from 'constants/queries/queryKeys';
import { ApiErrorResponse } from 'types/ApiResponse';
import {
  useCancelPermittedApplicant,
  useDenyApplicationUser,
  usePermitApplicant,
} from 'hooks/queries/ledger';
import userHeaderStyles from './UserHeader.style';
import ActionButton from '../buttons/ActionButton/ActionButton';

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
      closeText: '신청명단으로 이동',
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
    () => successCallback('성공적으로 승인되었습니다!'),
    handlePermitError,
  );

  const handleApprove = async () => {
    await permitApplicant({ ladgerId: ledgerId });
  };

  const { mutateAsync: denyApplicationUser } = useDenyApplicationUser(
    () => successCallback('승인이 거부되었습니다'),
    handlePermitError,
  );

  const handleDeny = async () => {
    openDialog({
      type: 'confirm',
      text: '승인을 거부하시겠습니까?',
      apply: async () => {
        await denyApplicationUser({ ledgerId });
      },
      applyText: '예',
      closeText: '아니오',
    });
  };

  const { mutateAsync: cancelPermittedApplicant } = useCancelPermittedApplicant(
    () => successCallback('승인이 취소되었습니다'),
    handlePermitError,
  );

  const handleCancel = async () => {
    openDialog({
      type: 'confirm',
      text: '승인을 취소하시겠습니까?',
      apply: async () => {
        await cancelPermittedApplicant({ ladgerId: ledgerId });
      },
      applyText: '예',
      closeText: '아니오',
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
              입장완료
            </Text>
          </View>
        )}
        {!userInfo.isJoined && userInfo.isAccepted && (
          <ActionButton
            label="승인 취소"
            style={userHeaderStyles.approveBtn}
            onPress={handleCancel}
          />
        )}
        {!userInfo.isJoined && !userInfo.isAccepted && (
          <>
            <ActionButton label="거절" onPress={handleDeny} />
            <ActionButton
              label="승인"
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
