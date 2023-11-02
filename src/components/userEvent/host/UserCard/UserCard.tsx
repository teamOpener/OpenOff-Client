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
import getPartOfUserName from 'utils/text';
import { EventApplicantInfoResponseDto } from 'models/ledger/response/EventApplicantInfoResponseDto';
import { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { ApiErrorResponse } from 'types/ApiResponse';
import ActionButton from '../buttons/ActionButton/ActionButton';
import userCardStyles from './UserCard.style';

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
      text: error.response?.data.message ?? i18n.t('default_error_message'),
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
      text: i18n.t('title_decline'),
      contents: i18n.t('reason_selection'),
      denyText: i18n.t('yes'),
      closeText: i18n.t('no'),
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
              {getPartOfUserName(eventApplicantInfo.username)}
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
              {i18n.t('show_detail')}
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
                <ActionButton label={i18n.t('deny')} onPress={handleDeny} />
                <ActionButton
                  label={i18n.t('label_approve')}
                  style={userCardStyles.approveBtn}
                  onPress={handleApprove}
                />
              </>
            )}

          {/* 승인 후 */}
          {!isPermitLoading &&
            eventApplicantInfo.isAccepted &&
            !eventApplicantInfo.isJoined && (
              <ActionButton
                label={i18n.t('label_cancel_approval')}
                onPress={handleCancel}
              />
            )}

          {/* 입장완료 */}
          {!isPermitLoading && eventApplicantInfo.isJoined && (
            <View style={userCardStyles.admissionTextWrapper}>
              <Text color="lightGreen" style={userCardStyles.admissionText}>
                {i18n.t('attended')}
              </Text>
            </View>
          )}
        </SpaceLayout>
      </SpaceLayout>
    </View>
  );
};

export default UserCard;
