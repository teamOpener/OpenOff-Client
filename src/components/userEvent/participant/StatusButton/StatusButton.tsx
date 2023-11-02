import i18n from 'locales';
import { colors } from 'styles/theme';
import { TouchableOpacity, View } from 'react-native';
import TicketType from 'models/ledger/entity/TicketType';
import Icon from 'components/common/Icon/Icon';
import Text from 'components/common/Text/Text';
import { UserTicketStatus } from 'constants/userEvent/participant/participantConstants';
import statusButtonStyles from './StatusButton.style';

interface Props {
  status: UserTicketStatus;
  ticketType: TicketType;
  onPress: () => void;
}

const StatusButton = ({ status, ticketType, onPress }: Props) => {
  const getColorType = (type: TicketType): keyof typeof colors => {
    switch (ticketType) {
      case TicketType.A:
      case TicketType.C:
      case TicketType.E:
        return 'main';
      default:
        return 'white';
    }
  };

  const getMessage = (ticketStatus: UserTicketStatus): string => {
    switch (ticketStatus) {
      case UserTicketStatus.CANCELED:
        return i18n.t('application_canceled');
      case UserTicketStatus.DENIED:
        return i18n.t('approval_declined');
      default:
        return i18n.t('waiting_approval');
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
        <View
          style={[
            statusButtonStyles.qrWrapper,
            {
              backgroundColor: colors[getColorType(ticketType)],
            },
          ]}
        >
          <Icon name="IconQR" fill="black" size={32} />
        </View>
        <Text
          color={getColorType(ticketType)}
          style={statusButtonStyles.qrText}
        >
          {i18n.t('view_qr')}
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
