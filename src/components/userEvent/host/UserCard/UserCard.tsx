import { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { ApiErrorResponse } from 'types/ApiResponse';
import queryKeys from 'constants/queries/queryKeys';
import API_ERROR_MESSAGE from 'constants/errorMessage';
import Icon from 'components/common/Icon/Icon';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import Text from 'components/common/Text/Text';
import useNavigator from 'hooks/navigator/useNavigator';
import useDialog from 'hooks/app/useDialog';
import {
  useCancelPermittedApplicant,
  useDenyApplicationUser,
  usePermitApplicant,
} from 'hooks/queries/ledger';
import { EventApplicantInfoResponseDto } from 'models/ledger/response/EventApplicantInfoResponseDto';
import userCardStyles from './UserCard.style';
import ActionButton from '../buttons/ActionButton/ActionButton';

interface Props {
  eventApplicantInfo: EventApplicantInfoResponseDto;
  eventIndexId: number;
}

const UserCard = ({ eventApplicantInfo, eventIndexId }: Props) => {
  const queryClient = useQueryClient();
  const { stackNavigation } = useNavigator();
  const { openDialog } = useDialog();

  const [isPermitLoading, setIsPermitLoading] = useState<boolean>(false);

  const handleMoveDetailPage = () => {
    stackNavigation.navigate('HostLedgerDetail', {
      ledgerId: eventApplicantInfo.ladgerId,
    });
  };

  const resetQueries = () => {
    queryClient.invalidateQueries(queryKeys.participantKeys.all);
    queryClient.invalidateQueries(queryKeys.eventKeys.details);
    queryClient.invalidateQueries(queryKeys.hostKeys.ledgerList);
    queryClient.invalidateQueries(
      queryKeys.hostKeys.statusByIndexId(eventIndexId),
    );
    queryClient.invalidateQueries(
      queryKeys.hostKeys.applicantQnAbyLedgerId(eventApplicantInfo.ladgerId),
    );
  };

  const handlePermitSuccess = () => {
    setIsPermitLoading(true);
    resetQueries();
    setTimeout(() => {
      resetQueries();
      setIsPermitLoading(false);
    }, 1000);
  };

  const handlePermitError = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? API_ERROR_MESSAGE.DEFAULT,
    });
  };

  /**
   * 승인
   */

  const { mutateAsync: permitApplicant } = usePermitApplicant(
    handlePermitSuccess,
    handlePermitError,
  );

  const handleApprove = async () => {
    await permitApplicant({ ladgerId: eventApplicantInfo.ladgerId });
  };

  /**
   * 거절
   */

  const { mutateAsync: denyApplicationUser } = useDenyApplicationUser(
    handlePermitSuccess,
    handlePermitError,
  );

  const handleDeny = async () => {
    openDialog({
      type: 'confirm',
      text: '승인을 거절하시겠습니까?',
      contents: '사유를 선택해주세요.',
      denyText: '예',
      closeText: '아니오',
      deny: async (rejectReason: string) => {
        await denyApplicationUser({
          ledgerId: eventApplicantInfo.ladgerId,
          rejectReason,
        });
      },
    });
  };

  /**
   * 승인 취소
   */

  const { mutateAsync: cancelPermittedApplicant } = useCancelPermittedApplicant(
    handlePermitSuccess,
    handlePermitError,
  );

  const handleCancel = async () => {
    await cancelPermittedApplicant({ ladgerId: eventApplicantInfo.ladgerId });
  };

  return (
    <View style={userCardStyles.container}>
      <View
        style={[
          userCardStyles.leftLine,
          eventApplicantInfo.isJoined && userCardStyles.joinedLeftLine,
        ]}
      />

      <SpaceLayout
        direction="row"
        size={10}
        style={userCardStyles.rightContainer}
      >
        <SpaceLayout size={13} style={userCardStyles.userInfoContainer}>
          <SpaceLayout direction="row" size={5} style={userCardStyles.userInfo}>
            <Text style={userCardStyles.nameText}>
              {eventApplicantInfo.username}
            </Text>
            <Text style={userCardStyles.birthText}>
              {eventApplicantInfo.birth}
            </Text>

            {eventApplicantInfo.genderType === 'MAN' ? (
              <Icon name="IconMale" size={13} fill="blue" />
            ) : (
              <Icon name="IconFemale" size={13} fill="error" />
            )}
          </SpaceLayout>

          <TouchableOpacity
            activeOpacity={0.8}
            style={userCardStyles.detailWrapper}
            onPress={handleMoveDetailPage}
          >
            <Text color="main" style={userCardStyles.detailText}>
              상세보기
            </Text>
            <Icon name="IconArrowRight" size={10} fill="main" />
          </TouchableOpacity>
        </SpaceLayout>

        <SpaceLayout
          direction="row"
          size={5}
          style={userCardStyles.buttonsContainer}
        >
          {isPermitLoading && (
            <View style={{ marginRight: 30 }}>
              <ActivityIndicator />
            </View>
          )}

          {/* 승인전 */}
          {!isPermitLoading &&
            !eventApplicantInfo.isAccepted &&
            !eventApplicantInfo.isJoined && (
              <>
                <ActionButton label="거절" onPress={handleDeny} />
                <ActionButton
                  label="승인"
                  style={userCardStyles.approveBtn}
                  onPress={handleApprove}
                />
              </>
            )}

          {/* 승인 후 */}
          {!isPermitLoading &&
            eventApplicantInfo.isAccepted &&
            !eventApplicantInfo.isJoined && (
              <ActionButton label="승인취소" onPress={handleCancel} />
            )}

          {/* 입장완료 */}
          {!isPermitLoading && eventApplicantInfo.isJoined && (
            <View style={userCardStyles.admissionTextWrapper}>
              <Text color="lightGreen" style={userCardStyles.admissionText}>
                입장완료
              </Text>
            </View>
          )}
        </SpaceLayout>
      </SpaceLayout>
    </View>
  );
};

export default UserCard;
