import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { UserTicketStatus } from 'constants/userEvent/participant/participantConstants';
import MENT_PARTICIPANT from 'constants/userEvent/participant/participantMessage';
import { TouchableOpacity, View } from 'react-native';
import statusButtonStyles from './StatusButton.style';

interface Props {
  status: UserTicketStatus;
  onPress: () => void;
}

const StatusButton = ({ status, onPress }: Props) => {
  const getMessage = (s: UserTicketStatus): string => {
    switch (s) {
      case UserTicketStatus.CANCELED:
        return MENT_PARTICIPANT.MAIN.CANCELED;
      case UserTicketStatus.DENIED:
        return MENT_PARTICIPANT.MAIN.DENIED;
      default:
        return MENT_PARTICIPANT.MAIN.WAITING;
    }
  };

  if (
    status === UserTicketStatus.APPROVED ||
    status === UserTicketStatus.ATTENDED ||
    status === UserTicketStatus.ENDED
  ) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={statusButtonStyles.container}
        onPress={onPress}
      >
        <View style={statusButtonStyles.qrWrapper}>
          <Icon name="IconQR" fill="black" size={32} />
        </View>
        <Text color="main" style={statusButtonStyles.qrText}>
          {MENT_PARTICIPANT.MAIN.QR}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    //   TODO: dialog 띄우기 - 후순위
    <View style={statusButtonStyles.container}>
      <Text variant="body2">{getMessage(status)}</Text>
    </View>
  );
};

export default StatusButton;
