import { TouchableOpacity, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/apps/menu';
import { useUserTickets } from 'hooks/queries/ledger';
import { UserTicketStatus } from 'constants/userEvent/participant/participantConstants';
import Text from 'components/common/Text/Text';
import MENT_PARTICIPANT from 'constants/userEvent/participant/participantMessage';
import { TicketQR } from 'components/userEvent/participant';
import userQRScreenStyles from './UserQRScreen.style';

type UserQRScreenRouteProp = RouteProp<RootStackParamList, 'UserQR'>;

const UserQRScreen = () => {
  const { params } = useRoute<UserQRScreenRouteProp>();
  const { data: tickets, isLoading } = useUserTickets(params.eventId);

  const handleCancel = () => {
    // TODO
  };

  return (
    <View style={userQRScreenStyles.container}>
      {/* TODO: 이미 사용된 티켓, 이미 종료된 이벤트입니다. */}
      <View>
        <View style={userQRScreenStyles.absoluteStatus}>
          <Text style={userQRScreenStyles.topInfoText}>
            {MENT_PARTICIPANT.MAIN.ATTENDED_INFO}
          </Text>
        </View>

        <TicketQR status={UserTicketStatus.APPROVED} />
      </View>

      {/* TODO: 승인완료 상태일 때만 등장 */}
      <TouchableOpacity
        activeOpacity={0.6}
        style={userQRScreenStyles.cancelBtn}
        onPress={handleCancel}
      >
        <Text variant="body3">{MENT_PARTICIPANT.MAIN.CANCEL_BTN}</Text>
      </TouchableOpacity>

      {/* TODO: 승인완료 상태일 때만 등장 */}
      <View style={userQRScreenStyles.bottomInfo}>
        <Text variant="body3" style={userQRScreenStyles.bottomInfoText}>
          {MENT_PARTICIPANT.MAIN.ADMISSION_INFO}
        </Text>
      </View>
    </View>
  );
};

export default UserQRScreen;
