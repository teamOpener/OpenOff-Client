import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import SpaceLayout from 'components/layout/Space/SpaceLayout';
import { View } from 'react-native';

import API_ERROR_MESSAGE from 'constants/errorMessage';
import { useQueryClient } from '@tanstack/react-query';
import useNavigator from 'hooks/navigator/useNavigator';
import useDialog from 'hooks/app/useDialog';
import queryKeys from 'constants/queryKeys';
import { ApiErrorResponse } from 'types/ApiResponse';
import {
  useCancelPermittedApplicant,
  useDenyApplicationUser,
  usePermitApplicant,
} from 'hooks/queries/ledger';
import userHeaderStyles from './UserHeader.style';
import ActionButton from '../buttons/ActionButton/ActionButton';

interface Props {
  username: string;
  birth: string;
  ledgerId: number;
  eventIndexId: number;
  isAccepted: boolean;
}

const UserHeader = ({
  username,
  birth,
  ledgerId,
  eventIndexId,
  isAccepted,
}: Props) => {
  const queryClient = useQueryClient();
  const { stackNavigation } = useNavigator();
  const { openDialog } = useDialog();

  const successCallback = (text: string) => {
    // TODO isAccpeted가 느리게 반영될 때
    queryClient.invalidateQueries(queryKeys.participantKeys.all);
    queryClient.invalidateQueries(queryKeys.hostKeys.ledgerList);
    queryClient.invalidateQueries(
      queryKeys.hostKeys.statusByIndexId(eventIndexId),
    );
    queryClient.invalidateQueries(
      queryKeys.hostKeys.applicantQnAbyLedgerId(ledgerId),
    );
    queryClient.invalidateQueries(queryKeys.eventKeys.details);

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
        <Text>{username}</Text>
        <Text>{birth}</Text>
        {/* TODO dto 성별없음 */}
        {/* <Icon name="IconFemale" size={17} fill="error" /> */}
      </SpaceLayout>

      <SpaceLayout direction="row" size={5}>
        {/* TODO 입장완료 */}
        {isAccepted ? (
          <ActionButton
            label="승인 취소"
            style={userHeaderStyles.approveBtn}
            onPress={handleCancel}
          />
        ) : (
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
