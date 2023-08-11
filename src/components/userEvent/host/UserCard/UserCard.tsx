import { Alert, TouchableOpacity, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { ApiErrorResponse } from 'types/ApiResponse';
import queryKeys from 'constants/queryKeys';
import API_ERROR_MESSAGE from 'constants/errorMessage';
import Icon from 'components/common/Icon/Icon';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import Text from 'components/common/Text/Text';
import useNavigator from 'hooks/navigator/useNavigator';
import {
  useCancelPermittedApplicant,
  usePermitApplicant,
} from 'hooks/queries/ledger';
import { EventApplicantInfoResponseDto } from 'models/ledger/response/EventApplicantInfoResponseDto';
import userCardStyles from './UserCard.style';
import ActionButton from '../buttons/ActionButton/ActionButton';

interface Props {
  eventApplicantInfo: EventApplicantInfoResponseDto;
}

const UserCard = ({ eventApplicantInfo }: Props) => {
  const { stackNavigation } = useNavigator();

  const handleMoveDetailPage = () => {
    stackNavigation.navigate('HostLedgerDetail', {
      ledgerId: eventApplicantInfo.ladgerId,
    });
  };

  const queryClient = useQueryClient();

  const handlePermitSuccess = () => {
    // TODO list update
    // queryClient.invalidateQueries(queryKeys.hostKeys.ledgerListByIndexId(eventApplicantInfo))
  };

  const handlePermitError = (error: ApiErrorResponse) => {
    // TODO
    Alert.alert(error.response?.data.message ?? API_ERROR_MESSAGE.DEFAULT);
  };

  const { mutateAsync: permitApplicant } = usePermitApplicant(
    handlePermitSuccess,
    handlePermitError,
  );

  const { mutateAsync: cancelPermittedApplicant } = useCancelPermittedApplicant(
    handlePermitSuccess,
    handlePermitError,
  );

  // TODO
  const handleApprove = async () => {
    await permitApplicant({ ladgerId: eventApplicantInfo.ladgerId });
  };

  const handleDeny = () => {
    // TODO
  };

  // TODO
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
          {/* 승인전 */}
          {!eventApplicantInfo.isAccepted && !eventApplicantInfo.isJoined && (
            <>
              <ActionButton label="거절" onPress={handleDeny} />
              <ActionButton
                label="승인"
                style={userCardStyles.approveBtn}
                onPress={handleApprove}
              />
            </>
          )}
          {/* TODO 승인 거부 */}
          {/* 승인 후 */}
          {eventApplicantInfo.isAccepted && !eventApplicantInfo.isJoined && (
            <ActionButton label="승인취소" onPress={handleCancel} />
          )}

          {/* 입장완료 */}
          {eventApplicantInfo.isJoined && (
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
