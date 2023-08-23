import { TouchableOpacity, View } from 'react-native';
import MENT_PARTICIPANT from 'constants/userEvent/participant/participantMessage';
import {
  UserEventTabItem,
  UserTicketStatus,
} from 'constants/userEvent/participant/participantConstants';
import { BottomTabMenu, StackMenu } from 'constants/menu';
import API_ERROR_MESSAGE from 'constants/errorMessage';
import Text from 'components/common/Text/Text';
import { TicketQR } from 'components/userEvent/participant';
import useStackRoute from 'hooks/navigator/useStackRoute';
import useDialog from 'hooks/app/useDialog';
import useNavigator from 'hooks/navigator/useNavigator';
import useTicketStatus from 'hooks/event/useTicketStatus';
import {
  useCancelApplicationEvent,
  useUserTickets,
} from 'hooks/queries/ledger';
import { MyTicketInfoResponseDto } from 'models/ledger/response/MyTicketInfoResponseDto';
import { ApiErrorResponse } from 'types/ApiResponse';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import { colors } from 'styles/theme';
import useResetQueries from 'hooks/queries/useResetQueries';
import resetQueryKeys from 'constants/queries/resetQueryKey';
import userQRScreenStyles from './UserQRScreen.style';

const UserQRScreen = () => {
  const { params } = useStackRoute<StackMenu.UserQR>();
  const { openDialog } = useDialog();
  const { resetQueries } = useResetQueries();
  const { tabNavigation } = useNavigator();

  const { data: tickets } = useUserTickets({
    eventInfoId: params.eventId,
  });
  const currentTicket: MyTicketInfoResponseDto | undefined = tickets?.find(
    (ticket) => ticket.ticketIndex === params.ticketId,
  );

  const { getEventTicketStatus, getEventTicketStatusHelpText } =
    useTicketStatus();

  const resetTickets = () => {
    if (!currentTicket) {
      return;
    }

    resetQueries(
      resetQueryKeys.cancelParticipantEvent({
        eventInfoId: params.eventId,
        eventIndexId: currentTicket.eventIndexId,
      }),
    );
    tabNavigation.navigate(BottomTabMenu.UserEvent, {
      tab: UserEventTabItem.PARTICIPANT,
    });
  };

  const handleSuccessCancel = () => {
    openDialog({
      type: 'success',
      text: '예매가 성공적으로 취소되었습니다.',
      closeText: '홈으로',
      callback: resetTickets,
    });
  };

  const handleErrorCancel = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? API_ERROR_MESSAGE.DEFAULT,
      closeText: '홈으로',
    });
  };

  const { mutateAsync: cancelApplicationEvent, isLoading } =
    useCancelApplicationEvent(handleSuccessCancel, handleErrorCancel);

  const handleCancel = async () => {
    if (!currentTicket) {
      return;
    }

    openDialog({
      type: 'confirm',
      text: '예매를 취소하시겠습니까?',
      applyText: '예',
      closeText: '아니오',
      apply: async () => {
        await cancelApplicationEvent({ ledgerId: currentTicket.ladgerId });
      },
    });
  };

  if (!currentTicket) {
    return null;
  }

  const status = getEventTicketStatus(currentTicket);

  const helpText = getEventTicketStatusHelpText(
    getEventTicketStatus(currentTicket),
  );

  return (
    <View style={userQRScreenStyles.container}>
      {isLoading && (
        <WithIconLoading
          isActive
          backgroundColor={colors.background}
          text="예매를 취소중입니다."
        />
      )}
      {helpText && (
        <View>
          <View style={userQRScreenStyles.absoluteStatus}>
            <Text style={userQRScreenStyles.topInfoText} color="error">
              {helpText}
            </Text>
          </View>
        </View>
      )}

      <View>
        <TicketQR status={status} ticket={currentTicket} />
      </View>

      {status === UserTicketStatus.APPROVED && (
        <>
          <TouchableOpacity
            activeOpacity={0.6}
            style={userQRScreenStyles.cancelBtn}
            onPress={handleCancel}
          >
            <Text variant="body3">{MENT_PARTICIPANT.MAIN.CANCEL_BTN}</Text>
          </TouchableOpacity>
          <View style={userQRScreenStyles.bottomInfo}>
            <Text variant="body3" style={userQRScreenStyles.bottomInfoText}>
              {MENT_PARTICIPANT.MAIN.ADMISSION_INFO}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default UserQRScreen;
