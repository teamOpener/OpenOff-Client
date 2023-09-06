import Text from 'components/common/Text/Text';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import { TicketQR } from 'components/userEvent/participant';
import API_ERROR_MESSAGE from 'constants/app/errorMessage';
import { BottomTabMenu, StackMenu } from 'constants/app/menu';
import resetQueryKeys from 'constants/queries/resetQueryKey';
import {
  UserEventTabItem,
  UserTicketStatus,
} from 'constants/userEvent/participant/participantConstants';
import MENT_PARTICIPANT from 'constants/userEvent/participant/participantMessage';
import useDialog from 'hooks/app/useDialog';
import useTicketStatus from 'hooks/event/useTicketStatus';
import useNavigator from 'hooks/navigator/useNavigator';
import useStackRoute from 'hooks/navigator/useStackRoute';
import {
  useCancelApplicationEvent,
  useUserTickets,
} from 'hooks/queries/ledger';
import useResetQueries from 'hooks/queries/useResetQueries';
import { MyTicketInfoResponseDto } from 'models/ledger/response/MyTicketInfoResponseDto';
import { TouchableOpacity, View } from 'react-native';
import { colors } from 'styles/theme';
import { ApiErrorResponse } from 'types/ApiResponse';
import MENT_DIALOG from 'constants/common/dialogMessage';
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
      text: MENT_PARTICIPANT.TICKET.CANCEL_SUCCESS,
      closeText: MENT_PARTICIPANT.TICKET.BACK_TO_HOME,
      callback: resetTickets,
    });
  };

  const handleErrorCancel = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? API_ERROR_MESSAGE.DEFAULT,
      closeText: MENT_PARTICIPANT.TICKET.BACK_TO_HOME,
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
      text: MENT_PARTICIPANT.TICKET.CANCEL,
      applyText: MENT_DIALOG.DIALOG.YES,
      closeText: MENT_DIALOG.DIALOG.NO,
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
          text={MENT_PARTICIPANT.TICKET.CANCEL_PROGRESS}
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
