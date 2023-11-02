import i18n from 'locales';
import Text from 'components/common/Text/Text';
import WithIconLoading from 'components/suspense/loading/WithIconLoading/WithIconLoading';
import { TicketQR } from 'components/userEvent/participant';
import { BottomTabMenu, StackMenu } from 'constants/app/menu';
import resetQueryKeys from 'constants/queries/resetQueryKey';
import {
  UserEventTabItem,
  UserTicketStatus,
} from 'constants/userEvent/participant/participantConstants';
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
      text: i18n.t('cancel_success'),
      closeText: i18n.t('back_to_home'),
      callback: resetTickets,
    });
  };

  const handleErrorCancel = (error: ApiErrorResponse) => {
    openDialog({
      type: 'validate',
      text: error.response?.data.message ?? i18n.t('default_error_message'),
      closeText: i18n.t('back_to_home'),
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
      text: i18n.t('cancel_confirmation'),
      applyText: i18n.t('yes'),
      closeText: i18n.t('no'),
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
          text={i18n.t('cancel_in_progress')}
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
            <Text variant="body3">{i18n.t('cancel_reservation_button')}</Text>
          </TouchableOpacity>
          <View style={userQRScreenStyles.bottomInfo}>
            <Text variant="body3" style={userQRScreenStyles.bottomInfoText}>
              {i18n.t('admission_info')}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default UserQRScreen;
